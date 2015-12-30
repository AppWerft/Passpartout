const X =0, Y=1, PADDING=10;

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
	PDF.setFillColor(200,10,60);
	/* Erweiterungen des PDF-Objektes: */
	PDF.addText = function(text, coords) {
		var x = coords[0] >= 0 ? parseFloat(coords[0]) : PDF.internal.pageSize.width + coords[0],
		    y = coords[1] >= 0 ? coords[1] : PDF.internal.pageSize.height + coords[1];
		console.log(x + ' ≈ ' + y + ' ≈ ',text);    
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
	PDF.setDrawColor(200,100,100);
	
	
	require('controls/adressfenster').add(PDF, MODEL, UI);
	
	require('controls/provider').add(PDF, MODEL, UI);
	/* das war der Kopfbogen, nun der Inhalt: */

	/* we add vortext with variable height: */
	console.log('Vorspann');
	
	var ypos = require('controls/pretext').add(PDF, MODEL, UI);
	/* now we get the height of the adding above */

	/* and we know  now the available height for table */
	var availableHeight = PDF.internal.pageSize.height - ypos - Math.abs(UI.content.posttext[Y]);
	console.log('availableHeight: ' + availableHeight);
	var rows = [];
	/* first we collect all rows which shows data */
	/*printdata.services.forEach(function(s) {
		var cells = [];
		cells.push(s.unit);
		cells.push(s.text);
		cells.push(s.units);
		cells.push(s.amount + '  €');
		cells.push((s.amount * s.units) + '  €');
		rows.push(cells);
	});*/
	/* now we build the table */
	var options = {
		headers : ['Einheit', 'Leistung', 'Anzahl', 'Betrag', 'Summe'],
		data : rows,
		options : {
			theme : 'plain',
			margin : {
				top : ypos + 10,
				left : PADDING.LEFT,
				right : PADDING.RIGHT
			},
			styles : {
				valign : 'top',
				overflow : 'linebreak',
				columnWidth : 'auto',
				cellPadding : 0,
				rowHeight : 0
			}
		}
	};
	/* hooks for cell rendering */
	options.options.createdCell = function(cell, data) {
		if (data.column.dataKey > 1)
			cell.styles.halign = 'right';
	};
	options.options.createdHeaderCell = function(cell, data) {
		if (data.column.dataKey > 1)
			cell.styles.halign = 'right';
		else
			cell.styles.halign = 'left';
	};
	/* and test the options of table in test pdf document */
	var h = testTable(options);
	/* first case: it fits */
	if (h > availableHeight) {
		PDF.addPage();
	}
	PDF.addAutoTable(options);
	//PDF.addText(printdata.nachtext || '', TEMPLATE.NACHTEXT);
	//PDF.addText(printdata.gruss || '', TEMPLATE.GRUSS);

	/*	PDF.addQRCode({
	qr : {
	data : 'http://github.com/',
	ec : 'M'
	},
	x : 25,
	padding : 0,
	y : PDF.autoTableEndPosY(),
	width : 10
	});*/

	//PDF.addText(printdata.nachtext || '', TEMPLATE.NACHTEXT);
	//PDF.addText(printdata.gruss || '', TEMPLATE.GRUSS);
	// end of offer type

	var timeStampName = 'Rechnung_GK_' + Ti.App.Properties.getInt('nr', 0);
	var _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');
	PDF.save(_tempFile);
	console.log('Info: time for PDF creation: ' + (new Date().getTime() - start));
	return _tempFile;
};
