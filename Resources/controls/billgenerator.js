const X = 0,
    Y = 1,
    PADDING = 25;

var Moment = require('vendor/moment');

Number.prototype.toPt = function() {
	return this * 72 / 2.504;
};

module.exports = function(modelStr, UIStr) {
	var start = new Date().getTime();
	var PDF = new (require('ti.jspdf'))('p', 'mm');
	var pageHeight = PDF.internal.pageSize.height;
	PDF.setFillColor(200, 10, 60);
	/* Erweiterungen des PDF-Objektes: */
	PDF.addText = function(text, coords) {
		var x = coords[0] >= 0 ? parseFloat(coords[0]) : PDF.internal.pageSize.width + coords[0],
		    y = coords[1] >= 0 ? coords[1] : PDF.internal.pageSize.height + coords[1];

		return PDF.text(text, x, y);
	};
	PDF.addTextBox = function(text, x, y, width) {
		console.log('Info: start addTextBox');
		return PDF.autoTable([{
			title : "",
			dataKey : "first"
		}], [{
			first : text
		}], {
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
		});
	};
	/* Ende der PDF-Erweiterungen */

	/* ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ */
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
	var UI = JSON.parse(UIStr);
	PDF.setProperties(MODEL.metadata);

	/* Start rendering, setting defaults */
	PDF.setFont(UI.fontfamily);
	PDF.setDrawColor(200, 100, 100);

	require('controls/adressfenster.widget').add(PDF, MODEL, UI);
	console.log('Info: adressfenster gebaut ');
	require('controls/provider.widget').add(PDF, MODEL, UI);
	console.log('Info: provider gebaut ');

	/* das war der Kopfbogen, nun der Inhalt: */

	var ypos = require('controls/pretext.widget').add(PDF, MODEL, UI);
	console.log('Info: pretext gebaut ');
	/* now we get the height of the adding above */

	/* first we collect all rows which shows data */
	var headers = MODEL.content.services.headers.map(function(head, ndx) {
		return {
			title : head,
			dataKey : ndx
		};
	});
	var data = MODEL.content.services.rows.map(function(rowarray, rowndx) {
		console.log(rowarray);
		var row = {};
		headers.forEach(function(head, ndx) {
			row[head.dataKey] = rowarray[ndx];
		});
		return row;
	});
    
	var options = {
		startY : PDF.autoTableEndPosY()+10,
		theme : 'striped',
		tableWidth : PDF.internal.pageSize.width - 45,
		columnStyles : {
			"0" : {
				columnWidth : 15
			},

			"2" : {
				columnWidth : 20
			},
			"3" : {
				columnWidth : 30
			},
			"4" : {
				columnWidth : 30
			}
		},
		margin : {
			left : 25,
			right : 20,
			top : 20,
			bottom : 30,
		},
		styles : {
			overflow : 'linebreak',
			valign : 'middle',
			cellPadding : 5,
			rowHeight: 10
		},
		headerStyles : {
			rowHeight : 10
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
	};
	PDF.autoTable(headers, data, options);
	require('controls/posttext.widget').add(PDF, MODEL, UI);
	var timeStampName = 'Rechnung_GK_' + Ti.App.Properties.getInt('nr', 0);
	var _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');
	PDF.save(_tempFile);
	console.log('Info: time for PDF creation: ' + (new Date().getTime() - start));
	return _tempFile;
};
