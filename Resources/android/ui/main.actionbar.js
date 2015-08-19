var ActionBar = require('com.alcoapps.actionbarextras');
const LOGOUT = 0,
    M1 = 1,
    M2 = 2,
    M3 = 3;

module.exports = function() {
	var win = arguments[0].source;
	ActionBar.setTitle(win.title);
	win.subtitle && ActionBar.setSubtitle(win.subtitle);
	ActionBar.setFont('Frutiger'), ActionBar.subtitleColor = "#ddd", ActionBar.backgroundColor = '#0D387B';
	var activity = win.getActivity();
	if (activity) {
		activity.onCreateOptionsMenu = function() {
			var menu = arguments[0].menu;
			menu.clear();
			menu.add({
				title : 'Exit',
				icon : Ti.App.Android.R.drawable.ic_action_logout,
				itemId : LOGOUT,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			}).addEventListener("click", function() {
				var dialog = Ti.UI.createAlertDialog({
					message : 'Möchten Sie sich ausloggen?',
					ok : 'Okay',
					title : 'Sitzung beenden?'
				});
				dialog.show();
			});
			menu.add({
				title : 'Menüpunkt1 ',
				itemId : M1,
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			}).addEventListener("click", function() {
			});
			menu.add({
				title : 'Menüpunkt2 ',
				itemId : M2,
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			}).addEventListener("click", function() {
			});
			menu.add({
				title : 'Menüpunkt3 ',
				itemId : M3,
				checkable : true,
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			}).addEventListener("click", function() {
			});
			activity.actionBar.displayHomeAsUp = win.subtitle ? true : false;
		};
		activity.onPrepareOptionsMenu = function(_event) {
			var menu = _event.menu;
		};
		activity && activity.invalidateOptionsMenu();
		activity.actionBar.onHomeIconItemSelected = function(_e) {
			win.close();
		};
	}
};
