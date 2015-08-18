var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = Ti.UI.createTabGroup({
		backgroundColor : 'yellow', // for Android
		tabs : [Ti.UI.createTab({
			window : require('ui/accounts.container')(),
			title : 'Accounts',
			icon : GLOBALS.isIOS ? 'i2.png' : undefined
		}), Ti.UI.createTab({
			window : require('ui/projects.container')(),
			title : 'Projects',
			icon : GLOBALS.isIOS ? 'i1.png' : undefined
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
