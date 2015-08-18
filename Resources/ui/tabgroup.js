var GLOBALS = require('GLOBALS');
var AwesomeIcon = require('vendor/awesomeicons');
var iSize = GLOBALS.isAndroid ? 72 : 36;

module.exports = function() {
	var self = Ti.UI.createTabGroup({
		backgroundColor : 'yellow', // for Android
		tabs : [Ti.UI.createTab({
			window : require('ui/accounts.container')(),
			title : GLOBALS.isIOS ? 'Accounts' : null,
			icon : AwesomeIcon.createIcon({
				size : iSize,
				name : 'dashboard'
			})
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
