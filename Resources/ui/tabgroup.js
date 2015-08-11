var GLOBALS = require('GLOBALS');

module.exports = function() {
	return  Ti.UI.createTabGroup({
		tabs : [Ti.UI.createTab({
			window : require('ui/accounts.container')(),
			title : 'Accounts'
		}), Ti.UI.createTab({
			window : require('ui/projects.container')(),
			title : 'Projects'
		})],
		orientationModes : GLOBALS.isTablet ? [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT] : [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
};
