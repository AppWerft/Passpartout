// This is a test harness for your module
// You should do something interesting in this harness
// to test out the module and to provide instructions
// to users on how to use it by example.

// open a single window
var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});
var chooseintent = require('com.abp.chooseintent');
Ti.API.info("module is => " + chooseintent);

//create object instance, a parasitic subclass of Observable
var view = Ti.UI.createView();

var shareButton = Titanium.UI.createButton({
	title : 'Is Intent Available',
	top : '10dp',
	width : '45%',
	left : '2dp',
	height : 'auto'
});

var share2Button = Titanium.UI.createButton({
	title : 'Get Packages',
	top : '10dp',
	width : '45%',
	right : '2dp',
	height : 'auto'
});

var share3Button = Titanium.UI.createButton({
	title : 'Custom Chooser',
	top : '60dp',
	width : '45%',
	left : '2dp',
	height : 'auto'
});

var share4Button = Titanium.UI.createButton({
	title : 'Show Chooser',
	top : '60dp',
	width : '45%',
	right : '2dp',
	height : 'auto'
});

var share5Button = Titanium.UI.createButton({
	title : 'Empty Chooser',
	top : '110dp',
	width : '45%',
	left : '2dp',
	height : 'auto'
});

var share6Button = Titanium.UI.createButton({
	title : 'Delete Last Intent',
	top : '110dp',
	width : '45%',
	right : '2dp',
	height : 'auto'
});

var intentField = Titanium.UI.createTextField({
	value : 'android.intent.action.SEND',
	top : '160dp',
	left : 10,
	height : 'auto',
	width : '90%',
	color : '#555',
	textAlignment : 'left'
});

var packageField = Titanium.UI.createTextField({
	value : 'twitter',
	top : '210dp',
	left : 10,
	height : 'auto',
	width : '90%',
	color : '#555',
	textAlignment : 'left'
});

var progressLabel = Titanium.UI.createLabel({
	text : 'false',
	top : '260dp',
	left : 10,
	height : 'auto',
	width : '80%',
	color : '#555',
	textAlignment : 'center'
});

view.add(shareButton);
view.add(share2Button);
view.add(share3Button);
view.add(share4Button);
view.add(share5Button);
view.add(share6Button);
view.add(progressLabel);
view.add(intentField);
view.add(packageField);

shareButton.addEventListener('click', function() {
	var intent = {
		action : intentField.value,
		type : "text/plain",
		packageStr : packageField.value
	};
	Ti.API.info('isPackageAvailable: ' + chooseintent.isPackageAvailable(intent));
	progressLabel.text = chooseintent.isPackageAvailable(intent);
});

share2Button.addEventListener('click', function() {
	var intent = {
		action : intentField.value,
		type : "text/plain",
		packageStr : packageField.value
	};
	Ti.API.info('getPackages: ' + JSON.stringify(chooseintent.getPackages(intent)));
	progressLabel.text = chooseintent.getPackages(intent)[0];
});

share3Button.addEventListener('click', function() {
	var twit = {
		action : Ti.Android.ACTION_SEND,
		type : "text/plain",
		packageStr : packageField.value
	}
	var twitterPack = chooseintent.getPackages(twit);
	Ti.API.info(twitterPack);
	var twitter = {
		action : Ti.Android.ACTION_SEND,
		type : "text/plain",
		packageName : twitterPack[0]
	}
	chooseintent.addIntentToChooser(twitter);
	chooseintent.putExtra(Ti.Android.EXTRA_SUBJECT, "subject to be twitted");
	chooseintent.putExtra(Ti.Android.EXTRA_TEXT, "text to be twitted");
	var facebook = {
		action : Ti.Android.ACTION_SEND,
		type : "text/plain",
		packageName : 'com.facebook.katana'
	}
	chooseintent.addIntentToChooser(facebook);
	var email = {
		action : Ti.Android.ACTION_SEND,
		type : "text/plain",
		packageName : 'com.google.android.gm'
	}
	chooseintent.addIntentToChooser(email);
	chooseintent.putExtra(Ti.Android.EXTRA_SUBJECT, "subject to be shared");
	chooseintent.putExtra(Ti.Android.EXTRA_TEXT, "text to be shared");
	chooseintent.showChooser('Share');
});

share4Button.addEventListener('click', function() {
	chooseintent.showChooser('Share');
});

share5Button.addEventListener('click', function() {
	chooseintent.emptyChooser();
	chooseintent.showChooser('Share');
});

share6Button.addEventListener('click', function() {
	chooseintent.removeIntentFromChooser('com.twitter.android');
	chooseintent.showChooser('Share');
});

win.add(view);
win.open();

