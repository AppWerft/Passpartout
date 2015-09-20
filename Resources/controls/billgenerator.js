var Moment = require('vendor/moment');

Number.prototype.toPt = function() {
	return this * 72 / 2.504;
};

module.exports = function(modelStr) {
	var start = new Date().getTime();
	var PDF = new (require('ti.jspdf'))('p', 'mm');
	var pageHeight = PDF.internal.pageSize.height;
	const PADDING = {
		LEFT : 25,
		RIGHT : 25,
		BOTTOM : 10
	};
	PDF.addText = function(text, coords) {
		var x = coords[0] >= 0 ? parseFloat(coords[0]) : PDF.internal.pageSize.width + coords[0],
		    y = coords[1] >= 0 ? coords[1] : PDF.internal.pageSize.height + coords[1];
		return PDF.text(text, x, y);
	};
	var Model = {};
	try {
		Model = JSON.parse(modelStr);
	} catch (E) {
		console.log(E);
		alert('This configuration is not valid JSON');
		return null;
	}
	var templateFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', Model.model.type + '_template.json');
	if (!templateFile.exists()) {
		alert('No template for ' + Model.model.type + 'found');
		return null;
	}
	var TEMPLATE = JSON.parse(templateFile.read().getText());
	var metadata = Model.model.metadata,
	    printdata = Model.model.printdata;

	PDF.setProperties(metadata);
	switch (Model.model.type) {
	case 'offer':
		const BROTTEXT = 10.5;
		//dp
		PDF.setFont(TEMPLATE.FONTFAMILY);
		PDF.setDrawColor(0);
		PDF.setFontType("normal");
		PDF.setFontSize(7);
		PDF.addText(printdata.absender, TEMPLATE.ABSENDER);
		PDF.setFontSize(BROTTEXT);
		PDF.addText(printdata.kunde, TEMPLATE.KUNDE);
		PDF.addText(printdata.emailabsender, TEMPLATE.EMAILABSENDER);

		/* rechte Box */
		PDF.addText("Angebotsdatum:", TEMPLATE.ANGEBOT_DATUM.LABEL);
		PDF.addText(Moment().add(printdata.angebot_datum, 'day').format("DD. MM. YYYY"), TEMPLATE.ANGEBOT_DATUM.TEXT);

		PDF.addText("Gültig bis:", TEMPLATE.ANGEBOT_BIS.LABEL);
		PDF.addText(Moment().add(printdata.angebot_bis, 'day').format("DD. MM. YYYY"), TEMPLATE.ANGEBOT_BIS.TEXT);

		PDF.addText("Ansprechpartner:", TEMPLATE.ANGEBOT_KONTAKT.LABEL);
		PDF.addText(printdata.angebot_kontakt, TEMPLATE.ANGEBOT_KONTAKT.TEXT);

		PDF.addText("Telefon:", TEMPLATE.ANGEBOT_TELEFON.LABEL);
		PDF.addText(printdata.angebot_telefon, TEMPLATE.ANGEBOT_TELEFON.TEXT);

		PDF.addText("E-Mail:", TEMPLATE.ANGEBOT_EMAIL.LABEL);
		PDF.addText(printdata.angebot_email || '', TEMPLATE.ANGEBOT_EMAIL.TEXT);

		PDF.setFontType("bold");
		PDF.setFontSize(18);
		PDF.addText(printdata.titel || 'Angebot', TEMPLATE.TITEL);

		PDF.setFontSize(BROTTEXT);
		PDF.setFontType("normal");
		PDF.addText(printdata.vortext || 'Sehr geehrte Damen und Herren,', TEMPLATE.VORTEXT);
		/* Rendering of footer */
		const COLS = 5;
		var colspan = (PDF.internal.pageSize.width - PADDING.LEFT - PADDING.RIGHT) / COLS;
		PDF.setFontSize(7);
		PDF.setFontType("normal");

		TEMPLATE.FUSS.forEach(function(text, i) {
			var col = i % COLS;
			row = Math.floor(i / COLS);
			PDF.addText(text, [PADDING.LEFT + col * colspan, -row * COLS - 5]);
		});
		/* now we have to decide if the tabel fits (plus nachttext and gruss) or not */
		var availableHeight = PDF.internal.pageSize.height// total length
		- Math.abs(TEMPLATE.NACHTEXT[1])// position of nachtext
		- Math.abs(TEMPLATE.VORTEXT[1])// position of vortext
		- 30;
		// height of vortext
		//console.log('availableHeight=' + availableHeight);
		PDF.setFontSize(BROTTEXT);
		var table_y = Math.abs(TEMPLATE.VORTEXT[1]) + 10;
		//var text = "„Dès Noël où un zéphyr haï me vêt de glaçons würmiens, je dîne d’exquis rôtis de bœuf au kir à l’aÿ d’âge mûr & cætera !“\nVögel üben Gezwitscher oft ähnlich packend wie Jupp die Maus auf dem Xylophon einer Qualle.\nFalsches Üben von Xylophonmusik quält jeden größeren Zwerg";
		var text = require('vendor/loremipsum')(Math.round(Math.random()*500+10));
		PDF.addAutoTable({
			headers : [''],
			data : [[text]],
			options : {
				drawHeaderRow : function() {
					return false;
				},
				theme : 'plain',
				margin : {
					top : table_y,
					left : Math.abs(TEMPLATE.NACHTEXT[0]),
					right : Math.abs(TEMPLATE.NACHTEXT[0])
				},
				styles : {
					fontSize : BROTTEXT,
					valign : 'top',
					overflow : 'linebreak',
					columnWidth : 'auto',
					cellPadding : 0,
					rowHeight : 0
				}
			}
		});
		PDF.addQRCode({
			qr : {
				data : 'http://github.com/',
				ec : 'M'
			},
			x : 25,
			padding:0,
			y : PDF.autoTableEndPosY(),
			width : 10
		});

		//PDF.addText(printdata.nachtext || '', TEMPLATE.NACHTEXT);
		//PDF.addText(printdata.gruss || '', TEMPLATE.GRUSS);
		break;
	// end of offer type
	}
	var timeStampName = 'Rechnung_GK_' + Ti.App.Properties.getInt('nr', 0);
	var _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');
	PDF.save(_tempFile);
	console.log('Info: time for PDF creation: ' + (new Date().getTime() - start));
	return _tempFile;
};
