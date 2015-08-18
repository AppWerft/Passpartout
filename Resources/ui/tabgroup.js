var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = Ti.UI.createTabGroup({
		backgroundColor : 'yellow', // for Android
		tabs : [Ti.UI.createTab({
			window : require('ui/accounts.container')(),
			title : GLOBALS.isIOS ? 'Accounts' : null,
			icon : GLOBALS.isIOS ? 'i2.png' : '/images/accounts-icon.png'
		}), Ti.UI.createTab({
			window : require('ui/projects.container')(),
			title : GLOBALS.isIOS ? 'Projects' : null,
			icon : GLOBALS.isIOS ? 'i1.png' : '/images/projects-icon.png'
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
