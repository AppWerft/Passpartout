function Widget() {
	var t = Ti.UI.createView(),
	    e = require("bcbhh.bestsign");
	e.create(GLOBALS.isPad ? e.MODE_IPAD_DEVELOPMENT : e.MODE_IPHONE_DEVELOPMENT);
	var o = Titanium.UI.createButton({
		title : " BankProxy for " + Ti.Platform.osname + " ",
		width : Ti.UI.SIZE,
		borderWidth : 1,
		borderColor : "gray",
		height : 50,
		backgroundColor : "white",
		font : {
			fontSize : 56
		}
	});
	return o.addEventListener("click", function() {
		e.showConfigDialog();
	}), Ti.App.addEventListener("resumed", function() {
		e.onAppDidBecomeActive();
	}), Ti.App.addEventListener("app:Termination", function() {
		e.onAppWillTerminate();
	}), Ti.App.addEventListener("pause", function() {
		e.onAppWillResignActive();
	}), t.add(o), t.add(Ti.UI.createLabel({
		text : "screenWidth=" + Ti.Platform.displayCaps.platformWidth + "\nscreenHeight=" + Ti.Platform.displayCaps.platformHeight + "\nOS-Name=" + Ti.Platform.osname,
		bottom : 50,
		font : {
			fontFamily : "monospace",
			fontSize : 48
		}
	})), t;
}

var GLOBALS = require("GLOBALS");
module.exports = Widget; 