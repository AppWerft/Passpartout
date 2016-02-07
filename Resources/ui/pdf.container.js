var GLOBALS = require('GLOBALS');

module.exports = function() {
	function presetModel() {
		Ti.App.Properties.setString('MODEL2', Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'model_template.json').read().text);
	}

	function presetUI() {
		Ti.App.Properties.setString('UI2', Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'ui_template.json').read().text);
	}

	var self = Ti.UI.createView({
		backgroundColor : 'white',
	});
	if (!Ti.App.Properties.hasProperty('MODEL2')) {
		presetModel();
	}
	if (!Ti.App.Properties.hasProperty('UI2')) {
		presetUI();
	}
	var model = Ti.App.Properties.getString('MODEL2');
	var ui = Ti.App.Properties.getString('UI2');

	var ModelField = Ti.UI.createTextArea({
		value : model,
		top : 10,
		font : {
			fontFamily : 'monospace',
			fontSize : 16
		},
		color : 'black',
		width : Ti.UI.FILL,
		height : 400
	});
	self.add(ModelField);
	var UIField = Ti.UI.createTextArea({
		value : ui,
		top : 410,
		font : {
			fontFamily : 'monospace',
			fontSize : 16
		},
		color : 'black',
		width : Ti.UI.FILL,
		height : 400,
		borderWidth : 1,
		borderColor : 'yellow',
		borderRadius : 5
	});
	self.add(ModelField);
	ModelField.add(Ti.UI.createLabel({
		top : 10,
		font : {
			fontSize : 60,
			fontWeight : 'bold'
		},
		color : 'black',
		touchEnabled : false,
		opacity : 0.2,
		text : 'Model'
	}));
	self.add(UIField);
	UIField.add(Ti.UI.createLabel({
		top : 10,
		font : {
			fontSize : 60,
			fontWeight : 'bold'
		},
		color : 'black',
		touchEnabled : false,
		opacity : 0.2,
		text : 'UI Styles'
	}));

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
		var valide = true;
		try {
			JSON.parse(ModelField.getValue());
			Ti.App.Properties.setString('MODEL2', ModelField.getValue());
		} catch(E) {
			alert('Ungültige JSON für Daten');
			valide = false;
			//presetModel();
		};
		try {
			JSON.parse(UIField.getValue());
			Ti.App.Properties.setString('UI2', UIField.getValue());
		} catch(E) {
			alert('Ungültige JSON für Template');
			valide = false;
			//presetUI();
		};
		if (valide) {
			var pdfFile = require('controls/billgenerator')(ModelField.getValue(), UIField.getValue());
			require('ui/pdfpreview.window')(pdfFile);
		}

	});
	button2.addEventListener('click', function() {
		Ti.App.Properties.setString('MODEL2', jsonField.getValue());
		var nr = Ti.App.Properties.getInt('nr', 0);
		const EMAIL = ['rs@hamburger-appwerft.de'],
		    BCC = ['rs@hamburger-appwerft.de'],
		    SUBJECT = 'New invoice №' + nr,
		    BODY = "Vielen Dank für den Auftrag, den ich hoffentlich zu Ihrer allergrößten Zugfriedenheit „erledigt“ habe … Anbei die entsprechenden Bemerkungen, die ich geflissentlich anbiete";
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