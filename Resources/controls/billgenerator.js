var Moment = require('vendor/moment');

module.exports = function(modelStr) {
	var PDF = new (require('de.appwerft.jspdf'))();
	PDF.addText = function(text, coords) {
		var x = coords[0] > 0 ? parseFloat(coords[0]) : PDF.internal.pageSize.width + coords[0],
		    y = coords[1] > 0 ? coords[1] : PDF.internal.pageSize.height + coords[1];
		PDF.text(text, x, y);
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
	console.log(printdata);

	PDF.setProperties(metadata);
	switch (Model.model.type) {
	case 'offer':
		const BROTTEXT = 10;
		PDF.setFont(TEMPLATE.FONTFAMILY);
		PDF.setDrawColor(0);
		PDF.setFontType("normal");
		PDF.setFontSize(8);
		PDF.addText(printdata.absender, TEMPLATE.ABSENDER);
		PDF.setFontSize(BROTTEXT);
		PDF.addText(printdata.kunde, TEMPLATE.KUNDE);
		PDF.addText(printdata.emailabsender, TEMPLATE.EMAILABSENDER);

		/* rechte Box */
		PDF.addText("Angebotsdatum:", TEMPLATE.ANGEBOT_DATUM.LABEL);
		PDF.addText(Moment().add(printdata.angebot_datum, 'day').format("DD.MM,YYYY"), TEMPLATE.ANGEBOT_DATUM.TEXT);

		PDF.addText("Gültig bis:", TEMPLATE.ANGEBOT_BIS.LABEL);
		PDF.addText(Moment().add(printdata.angebot_bis, 'day').format("DD.MM,YYYY"), TEMPLATE.ANGEBOT_BIS.TEXT);

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
		PDF.addText(printdata.nachtext || '', TEMPLATE.NACHTEXT);
		PDF.addText(printdata.gruss || '', TEMPLATE.GRUSS);
		
		/* Fuss */
		PDF.setFontSize(7);
		PDF.setFontType("normal");
		const COLS=5;
		var colspan=  PDF.internal.pageSize.width/COLS;
		console.log(colspan);
		TEMPLATE.FUSS.forEach(function(text,i){
			var col = i%COLS;
			row = Math.floor(i/COLS);
			console.log(i + ' row=' + row + ' col='+ col);
			PDF.addText(text,[col*colspan,-row*COLS-5]);
			console.log((col*colspan) + '      ' + (-row*COLS+10));
		});
		break;

	}
	/*PDF.addQRCode({
	 qr : {
	 data : 'Wer das liest ist doof.'
	 },
	 x : 160,
	 y : 10,
	 width : 40
	 });
	 PDF.setFont("sans-serife");
	 PDF.addAutoTable({
	 headers : ["ID", "Name", "Country", "Count"],
	 data : [[1, "'Welch fieser Katzentyp quält da süße Vögel bloß zum Jux", "Ödland", "12345"], [2, "Nelson", "Kazakhstan", "345567"], [3, "Garcia", "Madagascar", "8365734"]],
	 options : {
	 margin : {
	 top : 70,
	 left : 10,
	 },
	 tableWidth : '100%'
	 }
	 });
	 //console.log(PDF.autoTableEndPosY());

	 PDF.setDrawColor(0);
	 PDF.addImage(Ti.Filesystem.resourcesDirectory + '/assets/image1.jpg', 'JPEG', 100, 180, 128, 72);
	 PDF.setFont("arial");
	 //	PDF.setFontType("bold");
	 PDF.setFontSize(27);
	 //PDF.text(20, 170, 'Hello world');
	 PDF.text(PDF.splitTextToSize('Welch fieser Katzentyp quält da süße Vögel bloß zum Jux?', 110), 10, 190);
	 PDF.addPage();
	 PDF.rect(20, 120, 10, 10);
	 // empty square
	 PDF.rect(40, 120, 10, 10, 'F');
	 // filled square
	 PDF.addImage(Ti.Filesystem.resourcesDirectory + '/assets/image2.jpg', 'JPEG', 70, 10, 100, 120);
	 PDF.setFont("helvetica");
	 PDF.setFontType("normal");
	 PDF.setFontSize(24);
	 //PDF.text(20, 180, 'This is what I looked like trying to get');
	 //	PDF.text(20, 190, 'the save function into the plugin system.');
	 //PDF.text(20, 200, 'It works now');
	 */
	var timeStampName = 'Rechnung_GK_' + Ti.App.Properties.getInt('nr', 0);
	var _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');
	PDF.save(_tempFile);
	return _tempFile;
};
