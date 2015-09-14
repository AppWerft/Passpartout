var GLOBALS = require('GLOBALS');
var AwesomeIcon = require('vendor/awesomeicons');
var iSize = GLOBALS.isAndroid ? 72 : 36;
/*
 AwesomeIcon.createIcon({name:'recents',color:'white',size:56});
 doesn't work ;-(())
 * */
module.exports = function() {
	var self = Ti.UI.createTabGroup({
		//backgroundColor : 'yellow', // for Android
		tabs : [Ti.UI.createTab({
			window : require('ui/accounts.container')(),
			title : 'Accounts',
			icon : '/bar-chart_dddddd.png'
		}),  Ti.UI.createTab({
			window : require('ui/inputs.container')(),
			title : 'Textfields',
			icon : '/bar-chart_dddddd.png'
		}), Ti.UI.createTab({
			window : require('ui/pdf.container')(),
			title : 'Offers/Invoices',
			icon : '/bar-chart_dddddd.png'
		})],
		// hiding of statusbar
		fullscreen : false,
		swipeable : false,
		orientationModes : GLOBALS.isTablet ? [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT] : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	if (GLOBALS.isAndroid)
		self.addEventListener('open', require('ui/main.actionbar'));
	return self;
};

Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
if ((Ti.Platform.osname === 'iphone') || (Ti.Platform.osname === 'ipad') || (Ti.Platform.osname === 'android')) {
	Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
}
if (Ti.Platform.osname === 'android') {
	Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
	Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
}
