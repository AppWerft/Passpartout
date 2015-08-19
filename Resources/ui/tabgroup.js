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
			icon : '/icons/bar-chart_dddddd.png'
		}), Ti.UI.createTab({
			window : require('ui/projects.container')(),
			title : 'Projects',
			icon : '/icons/stack-overflow_dddddd.png'
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
