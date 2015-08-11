var GLOBALS = require('GLOBALS');

module.exports = function() {

	switch (true) {
	/* iPad: SplitView with navgroup on right side*/
	case (GLOBALS.isPad ===true):
		var self = Ti.UI.iOS.SplitWindow({
			masterView : require('ui/accountlist')(),
			detailView : Ti.UI.iOS.NavigationWindow({
				window : require('ui/accountlist')
			}),
		});
		break;
	/* iPhone/iPod: Navigationgroup */
	case (GLOBALS.isIOS && GLOBALS.isHandheld):
		var self = Ti.UI.iOS.NavigationWindow({
			window : require('ui/accountlist')
		});
		break;
	}

	return self;
};
