module.exports = function() {
	var self = new (require('de.appwerft.jspdf'))();
	self.setProperties({
		title : 'Übertitel',
		subject : 'Betreff',
		author : 'John Doe',
		keywords : 'one, two, three',
		creator : 'Düzgün Jildiz'
	});
	self.addQRCode({
		qr : {
			data : 'Wer das liest ist doof.'
		},
		x : 160,
		y : 10,
		width : 40
	});/*
	self.addAutoTable({
		headers : ["ID", "Name", "Country", "Count"],
		data : [[1, "Shaw", "Tanzania", "12345"], [2, "Nelson", "Kazakhstan", "345567"], [3, "Garcia", "Madagascar", "8365734"]],
		options : {
			margin : {
				top : 70,
				left : 10,
			},
			tableWidth : '100%'
		}
	});*/
	//console.log(self.autoTableEndPosY());
	/*
	 */

	self.setDrawColor(0);
	self.addImage(Ti.Filesystem.resourcesDirectory + '/assets/image1.jpg', 'JPEG', 100	, 180, 128, 72);
	self.setFont("helvetica");
//	self.setFontType("bold");
	self.setFontSize(27);
	//self.text(20, 170, 'Hello world');
	self.text('ä ö ü\nÄ Ö Ü\nß é ',20, 190);
	self.addPage();
	self.rect(20, 120, 10, 10);
	// empty square
	self.rect(40, 120, 10, 10, 'F');
	// filled square
	self.addImage(Ti.Filesystem.resourcesDirectory + '/assets/image2.jpg', 'JPEG', 70, 10, 100, 120);
	self.setFont("helvetica");
	self.setFontType("normal");
	self.setFontSize(24);
	//self.text(20, 180, 'This is what I looked like trying to get');
//	self.text(20, 190, 'the save function into the plugin system.');
	//self.text(20, 200, 'It works now');
	var timeStampName = 'Rechnung_GK_' + Ti.App.Properties.getInt('nr', 0);
	var _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');
	self.save(_tempFile);
	return _tempFile;
};
