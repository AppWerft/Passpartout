var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		backgroundColor : 'white',
		layout : 'vertical'
	});
	var button1 = Ti.UI.createButton({
		top : 50,
		title : 'Generating of PDF',
		height : 50
	});
	self.add(button1);
	var button2 = Ti.UI.createButton({
		top : 50,
		title : 'Mailing of PDF',
		height : 50
	});
	self.add(button1);
	self.add(button2);

	button1.addEventListener('click', function() {
		var pdf = require('controls/billgenerator')();
		if (Ti.Android) {
			var pdfView = require("com.mykingdom.mupdf").createView({
				file : pdf
			});
			pdfView.setScrollingDirection(require("com.mykingdom.mupdf").DIRECTION_VERTICAL);
			self.removeAllChildren();
			self.add(pdfView);
		} else {
			var winPDF = Ti.UI.createWindow({
				backgroundColor : '#eee',
				height : Ti.UI.FILL,
				title : 'PDF Preview',
				width : Ti.UI.FILL
			});
			var btnClose = Ti.UI.createButton({
				title : 'Close'
			});
			btnClose.addEventListener('click', function(e) {
				winPDF.close();
			});
			winPDF.setRightNavButton(btnClose);
			var pdfview = Ti.UI.createWebView({
				backgroundColor : '#eee',
				url : pdf.nativePath,
				height : Ti.UI.FILL,
				width : Ti.UI.FILL
			});
			winPDF.add(pdfview);
			winPDF.open({
				modal : true
			});
		}

	});
	button2.addEventListener('click', function() {
//		http://stackoverflow.com/questions/6078099/android-intent-for-sending-email-with-attachment
		var pdf = require('controls/billgenerator')();
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Neue Rechnung";
		emailDialog.toRecipients = ['heinzpeter.olbrueck@intellinet.de'];
		emailDialog.messageBody = 'Vielen Dank für den Auftrag, den ich hoffentlich …';
		var f = Ti.Filesystem.getFile(pdf);
		emailDialog.addAttachment(f);
		emailDialog.addEventListener('complete', function() {
		});
		emailDialog.open();
	});
	return self;
};
