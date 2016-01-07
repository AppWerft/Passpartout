const X = 0,
    Y = 1,
    PADDING = 10;

var Moment = require('vendor/moment');

Number.prototype.toPt = function() {
	return this * 72 / 2.504;
};
var testTable = function(options) {
	var pdf = new (require('ti.jspdf'))('p', 'mm');
	pdf.addAutoTable(options);
	var h = pdf.autoTableEndPosY() - options.options.margin.top;
	pdf = null;
	return h;
};

module.exports = function(modelStr) {
	var start = new Date().getTime();
	var PDF = new (require('ti.jspdf'))('p', 'mm');
	var pageHeight = PDF.internal.pageSize.height;
	PDF.setFillColor(200, 10, 60);
	/* Erweiterungen des PDF-Objektes: */
	PDF.addText = function(text, coords) {
		var x = coords[0] >= 0 ? parseFloat(coords[0]) : PDF.internal.pageSize.width + coords[0],
		    y = coords[1] >= 0 ? coords[1] : PDF.internal.pageSize.height + coords[1];
		console.log(x + ' ≈ ' + y + ' ≈ ', text);
		return PDF.text(text, x, y);
	};
	PDF.addTextBox = function(text, x, y, width) {
		return PDF.addAutoTable({
			headers : [''],
			data : [[text]],
			options : {
				drawHeaderRow : function() {
					return false;
				},
				theme : 'plain',
				margin : {
					top : y,
					left : x,
					right : PDF.internal.pageSize.width - x - width
				},
				styles : {
					valign : 'top',
					overflow : 'linebreak',
					columnWidth : 'auto',
					cellPadding : 0,
					rowHeight : 0
				}
			}
		});
	};
	/* Ende der PDF-Erweiterungen */

	/* Logo rechts oben: */
	PDF.addImage(Ti.Filesystem.resourcesDirectory + '/assets/logo.jpg', 'JPEG', PDF.internal.pageSize.width - 90, 5, 80, 20);

	var MODEL = {};
	try {
		MODEL = JSON.parse(modelStr);
	} catch (E) {
		console.log(E);
		alert('This configuration is not valid JSON');
		return null;
	}
	/* hier liegen die Maße usw: */
	var templateFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'ui_template.json');
	if (!templateFile.exists()) {
		alert('No template for ' + Model.model.type + 'found');
		return null;
	}
	var UI = JSON.parse(templateFile.read().getText());

	PDF.setProperties(MODEL.metadata);

	/* Start rendering, setting defaults */
	PDF.setFont(UI.fontfamily);
	PDF.setDrawColor(200, 100, 100);

	require('controls/adressfenster.widget').add(PDF, MODEL, UI);

	require('controls/provider.widget').add(PDF, MODEL, UI);
	/* das war der Kopfbogen, nun der Inhalt: */

	var ypos = require('controls/pretext.widget').add(PDF, MODEL, UI);
	/* now we get the height of the adding above */

	/* and we know  now the available height for table */
	//var ypos = require('controls/table.widget').add(PDF, MODEL, UI,ypos);

	console.log(ypos);

	/* first we collect all rows which shows data */
	var headers = MODEL.content.services.headers.map(function(head, ndx) {
		return {
			title : head,
			dataKey : 'col' + ndx
		};
	});

	var rows = MODEL.content.services.rows.map(function(rowarray, rowndx) {
		var row = {};
		headers.forEach(function(head, ndx) {
			row[head.dataKey] = rowarray[ndx];
		});
		return row;
	});
	console.log(headers);
	console.log(rows);

	//TODO validation of array of array
	var tableoptions = {
		headers : headers,
		data : rows,
		options : {
			startY : ypos + 10,
			theme : 'striped',
			margin : {
				left : PADDING.LEFT,
				right : PADDING.RIGHT
			},
			styles : {
				valign : 'top',
				overflow : 'linebreak',
				columnWidth : 'auto',
				cellPadding : 5,
				rowHeight : 0
			},
			createdCell : function(cell, data) {
				if (data.column.dataKey > 1)
					cell.styles.halign = 'right';
			},
			createdHeaderCell : function(cell, data) {
				if (data.column.dataKey > 1)
					cell.styles.halign = 'right';
				else
					cell.styles.halign = 'left';
			}
		}
	};
	PDF.addAutoTable(tableoptions);
	console.log(PDF.autoTableEndPosY());
	require('controls/posttext.widget').add(PDF, MODEL, UI);

	var timeStampName = 'Rechnung_GK_' + Ti.App.Properties.getInt('nr', 0);
	var _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');
	PDF.save(_tempFile);
	console.log('Info: time for PDF creation: ' + (new Date().getTime() - start));
	return _tempFile;
};
