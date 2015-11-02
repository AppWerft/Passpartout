// TODO singleton pattern (calling of Proxy subscribing only once)!

var GLOBALS = require('GLOBALS');

function Widget() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	var bestSignModule = require("bcbhh.bestsign");

	bestSignModule.create(GLOBALS.isPad ? bestSignModule.MODE_IPAD_DEVELOPMENT : bestSignModule.MODE_IPHONE_DEVELOPMENT);
	//	bestSignModule.create(MODE_IPAD_DEVELOPMENT);
	//	bestSignModule.create(MODE_IPHONE_PRODUCTION);
	//	bestSignModule.create(MODE_IPAD_PRODUCTION);

	var button = Titanium.UI.createButton({
		"title" : " BankProxy for " + Ti.Platform.osname + ' ',
		"width" : Ti.UI.SIZE,
		borderWidth : 1,

		borderColor : 'gray',
		"height" : 50,
		backgroundColor : 'white',
		font : {
			fontSize : 56
		}
	});

	button.addEventListener("click", function() {
		bestSignModule.showConfigDialog();
	});

	Ti.App.addEventListener("resumed", function() {
		bestSignModule.onAppDidBecomeActive();
	});
	// TODO Is there any event we can register on for applicationWillTerminate?
	Ti.App.addEventListener("app:Termination", function() {
		bestSignModule.onAppWillTerminate();
	});
	Ti.App.addEventListener("pause", function() {
		bestSignModule.onAppWillResignActive();
	});
	self.add(button);
	return self;
}

module.exports = Widget;
