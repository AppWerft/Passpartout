/**
 * Copyright (c) 2015 by intellinet. All Rights Reserved.
 * Author: Rainer Schleevoigt
 * Please see the LICENSE included with this distribution for details.
 */

var GLOBALS = {
};

var SCREENHEIGHT = Ti.Platform.displayCaps.platformHeight,
    SCREENWIDTH = Ti.Platform.displayCaps.platformWidth;

if (Ti.Platform.osname === 'android') {
	SCREENHEIGHT /= Ti.Platform.displayCaps.logicalDensityFactor;
	SCREENWIDTH /= Ti.Platform.displayCaps.logicalDensityFactor;
} else {
	// iPad || iPad Pro
	GLOBALS.isPad = (Math.min(SCREENHEIGHT.SCREENWIDTH) == 768 || Math.min(SCREENHEIGHT.SCREENWIDTH) == 1024 ) ? strue : false;
}
/* Deciding device class */
GLOBALS.isTablet = GLOBALS.isPad || (Ti.Platform.osname === 'android' && (SCREENWIDTH > 899 || SCREENHEIGHT > 899));
GLOBALS.isHandheld = !GLOBALS.isTablet;

GLOBALS.isIOS = (Ti.Platform.osname[0] === 'i') ? true : false;
GLOBALS.isAndroid = (Ti.Platform.osname === 'android') ? true : false;

/* normalizing of w/h depending of device class */
var ratio = Math.max(SCREENWIDTH, SCREENHEIGHT) / Math.min(SCREENWIDTH, SCREENHEIGHT);

// exposing to global
GLOBALS.SCREENWIDTH = (GLOBALS.isTablet) ? Math.max(SCREENWIDTH, SCREENHEIGHT) : Math.min(SCREENWIDTH, SCREENHEIGHT);
GLOBALS.SCREENHEIGHT = (GLOBALS.isTablet) ? Math.min(SCREENWIDTH, SCREENHEIGHT) : Math.max(SCREENWIDTH, SCREENHEIGHT);

GLOBALS.RATIO = (ratio > 1.5) ? 'long' : 'notlong';

module.exports = GLOBALS;
