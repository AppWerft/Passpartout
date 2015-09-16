var GLOBALS = require('GLOBALS');

module.exports = function() {
	function presetModel() {
		var json = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'offer_model.json').read().text;
		Ti.App.Properties.setString('MODEL', json);
	}

	var self = require('ui/window')({
		backgroundColor : 'white',
		title : 'Offers/Invoices'
	});
	if (!Ti.App.Properties.hasProperty('MODEL')) {
		presetModel();
	}
	var json = Ti.App.Properties.getString('MODEL');
	var jsonField = Ti.UI.createTextArea({
		bottom : 50,
		value : json,
		top : 10,
		font : {
			fontFamily : 'monospace',
			fontSize : 18
		},
		color : 'black',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});
	self.add(jsonField);
	var buttonBar = Ti.UI.createView({
		bottom : 0,
		height : 50,
		layout : 'horizontal'
	});
	self.add(buttonBar);
	var button1 = Ti.UI.createButton({
		left : 10,
		title : 'Show PDF',
		height : 50,
		width : '45%'
	});
	buttonBar.add(button1);
	var button2 = Ti.UI.createButton({
		left : 10,
		width : '45%',
		title : 'Mailing of PDF'
	});
	buttonBar.add(button2);

	button1.addEventListener('click', function() {
		try {
			JSON.parse(jsonField.getValue());
			Ti.App.Properties.setString('MODEL', jsonField.getValue());
		} catch(E) {
			presetModel();
		};
		var pdfFile = require('controls/billgenerator')(jsonField.getValue());
		if (pdfFile) {
			var winPDF = Ti.UI.createWindow({
				backgroundColor : '#eee',
				height : Ti.UI.FILL,
				fullscreen : true,
				title : 'PDF Preview',
				width : Ti.UI.FILL
			});
			if (GLOBALS.isAndroid) {
				var pdfView = require("com.mykingdom.mupdf").createView({
					file : pdfFile
				});
				pdfView.setScrollingDirection(require("com.mykingdom.mupdf").DIRECTION_VERTICAL);
				winPDF.add(pdfView);
				winPDF.addEventListener('open', function() {
					winPDF.activity.actionBar.hide();
				});
				winPDF.open();

			} else if (GLOBALS.isIOS) {
				self.tab.open(winPDF);
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
			}
		}
	});
	button2.addEventListener('click', function() {
		Ti.App.Properties.setString('MODEL', jsonField.getValue());
		var nr = Ti.App.Properties.getInt('nr', 0);
		const EMAIL = ['rs@hamburger-appwerft.de'],
		    BCC = ['rs@hamburger-appwerft.de'],
		    SUBJECT = 'New invoice №' + nr,
		    BODY = "Vielen Dank für den Auftrag, den ich hoffentlich zu Ihrer allergrößten Zugfriedenheit „erledigt“ habe …";
		var pdfFile = require('controls/billgenerator')(jsonField.getValue());
		if (pdfFile) {
			if (GLOBALS.isIOS) {
				var emailDialog = Ti.UI.createEmailDialog();
				if (emailDialog.isSupported()) {
					emailDialog.subject = SUBJECT;
					emailDialog.toRecipients = EMAIL;
					emailDialog.messageBody = BODY;
					emailDialog.addAttachment(pdfFile);
					emailDialog.addEventListener('complete', function() {
						console.log('Info: PDF successful sendet');
					});
					emailDialog.open();
				} else {
					console.log('Info: on this device is not mail app configured');
				}
			}
			if (GLOBALS.isAndroid) {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_SEND,
					packageName : 'com.google.android.gm',
					type : 'application/octet-stream',
					//		className :'com.google.android.gm.AutoSendActivity'
				});
				// https://gist.github.com/adumont/8040008
				intent.putExtra(Ti.Android.EXTRA_EMAIL, EMAIL);
				intent.putExtra(Ti.Android.EXTRA_SUBJECT, SUBJECT);
				intent.putExtra(Ti.Android.EXTRA_TEXT, BODY);
				intent.putExtraUri(Ti.Android.EXTRA_STREAM, pdfFile.nativePath);
				Ti.Android.currentActivity.startActivityForResult(intent, function(e) {
					console.log(_e);
				});
			}
			Ti.App.Properties.setInt('nr', nr + 1);
		}

	});
	return self;
};
/*
 https://gist.github.com/dawsontoth/832488

 * */