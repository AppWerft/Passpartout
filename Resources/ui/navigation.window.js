/* Singleton pattern */
var navigationWindow = navigationWindow;
var GLOBALS = require('GLOBALS');

exports.create = function(newwin) {
    if (GLOBALS.isIOS) {
        navigationWindow = Ti.UI.iOS.createNavigationWindow({
            window : newwin,
        });
        return navigationWindow;
    }
};

exports.open = function(newwin) {
    if (GLOBALS.isAndroid || GLOBALS.isHandheld) {
        newwin.open();
    } else {
        navigationWindow.openWindow(newwin);
    }
};

exports.close = function(win) {
    if (GLOBALS.isAndroid) {
        win.removeAllChildren();
        win.close();
        win = null;
    } else {
        win.removeAllChildren();
        win.close();
        win = null;
    }
};
