var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		backgroundColor : 'white',
		layout : 'vertical'
	});
	var button1 = Ti.UI.createButton({
		top : 50,
		title : 'Show PDF',
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
		var pdfFile = require('controls/billgenerator')();
		console.log('pdfFile.apiName=' + pdfFile.apiName);
		if (GLOBALS.isAndroid) {
			var pdfView = require("com.mykingdom.mupdf").createView({
				file : pdfFile
			});
			pdfView.setScrollingDirection(require("com.mykingdom.mupdf").DIRECTION_VERTICAL);
			self.removeAllChildren();
			self.add(pdfView);
		} else if (GLOBALS.isIOS) {
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
				url : pdfFile.nativePath,
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
		var nr = Ti.App.Properties.getInt('nr', 0);
		const EMAIL = ['heinzpeter.olbrueck@intellinet.de'],
		    BCC = ['rs@hamburger-appwerft.de'],
		    SUBJECT = 'Neue Rechnung №' + nr,
		    BODY = "Vielen Dank für den Auftrag, den ich hoffentlich zu Ihrer allergrößten Zugfriedenheit „erledigt“ habe …";
		var pdfFile = require('controls/billgenerator')();
		if (GLOBALS.isIOS) {
			var emailDialog = Ti.UI.createEmailDialog();
			if (emailDialog.isSupported()) {
				emailDialog.subject = SUBJECT;
				emailDialog.toRecipients = EMAIL;
				emailDialog.messageBody = BODY;
				emailDialog.addAttachment(pdfFile);
				emailDialog.addEventListener('complete', function() {
				});
				emailDialog.open();
			} else {
				alert('Kein eMailkonto eingerichtet');
			}
		}
		if (GLOBALS.isAndroid) {
			// TODO: detecting if googlemail ist installed
			console.log('isPDF ' + pdfFile.exists());
			var intent = Ti.Android.createIntent({
				action : Ti.Android.ACTION_SEND,
				packageName : 'com.google.android.gm',
				type : 'application/octet-stream',
				//className :'com.google.android.gm.AutoSendActivity'
			});
			// https://gist.github.com/adumont/8040008
			intent.putExtra(Ti.Android.EXTRA_EMAIL, EMAIL);
			intent.putExtra(Ti.Android.EXTRA_SUBJECT, SUBJECT);
			intent.putExtra(Ti.Android.EXTRA_TEXT, BODY);
			intent.putExtraUri(Ti.Android.EXTRA_STREAM, pdfFile.nativePath);
			Ti.Android.currentActivity.startActivityForResult(intent, function(_e) {
				console.log(_e);
			});
		}
		Ti.App.Properties.setInt('nr', nr + 1);
	});
	return self;
};
