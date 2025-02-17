var GLOBALS = require("GLOBALS"),
    AwesomeIcon = require("vendor/awesomeicons");
module.exports = function() {
	var t = Ti.UI.createTabGroup({
		backgroundColor : "white",
		tabs : [Ti.UI.createTab({
			window : require("ui/pdf.container")(),
			title : "Offers/Invoices",
			icon : "/bar-chart_dddddd.png"
		}), Ti.UI.createTab({
			window : require("ui/accounts.container")(),
			title : "Accounts",
			icon : "/bar-chart_dddddd.png"
		}), Ti.UI.createTab({
			window : require("ui/inputs.container")(),
			title : "Textfields",
			icon : "/bar-chart_dddddd.png"
		})],
		fullscreen : !1,
		swipeable : !1,
		orientationModes : GLOBALS.isTablet ? [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT] : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	return GLOBALS.isAndroid && t.addEventListener("open", require("ui/main.actionbar")), t
}, Ti.API.info("Ti.Platform.displayCaps.density: " + Ti.Platform.displayCaps.density), Ti.API.info("Ti.Platform.displayCaps.dpi: " + Ti.Platform.displayCaps.dpi), Ti.API.info("Ti.Platform.displayCaps.platformHeight: " + Ti.Platform.displayCaps.platformHeight), Ti.API.info("Ti.Platform.displayCaps.platformWidth: " + Ti.Platform.displayCaps.platformWidth), ("iphone" === Ti.Platform.osname || "ipad" === Ti.Platform.osname || "android" === Ti.Platform.osname) && Ti.API.info("Ti.Platform.displayCaps.logicalDensityFactor: " + Ti.Platform.displayCaps.logicalDensityFactor), "android" === Ti.Platform.osname && (Ti.API.info("Ti.Platform.displayCaps.xdpi: " + Ti.Platform.displayCaps.xdpi), Ti.API.info("Ti.Platform.displayCaps.ydpi: " + Ti.Platform.displayCaps.ydpi)); 