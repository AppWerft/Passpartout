/**
 * Copyright (c) 2015 by satzmedia. All Rights Reserved.
 * Author: Rainer Schleevoigt
 * Please see the LICENSE included with this distribution for details.
 */

var GLOBALS = require('GLOBALS');

module.exports = function() {
	var options = arguments[0] || {};
	var total = options.pages.length;
	if (GLOBALS.isAndroid) {
		var FlipModule = require('de.manumaticx.androidflip');
		var self = FlipModule.createFlipView({
			orientation : FlipModule.ORIENTATION_HORIZONTAL,
			overFlipMode : FlipModule.OVERFLIPMODE_GLOW,
			views : options.pages,
			height : Ti.UI.FILL,
			currentPage : (options.startPage) ? options.startPage : 0,
			top : GLOBALS.TOPBARHEIGHT,
			bottom : GLOBALS.BOTTOMBARHEIGHT,
			total : total
		});
		self.addEventListener('flipped', function(_e) {
			options && options.onflipend({
				current : _e.index,
				pagecount : total,
				total : total
			});
		});
		self.bounceForward = self.peakNext;
		return self;
	}
	/* iOS, also iPhone, iPad und iPod*/
	if (GLOBALS.isIOS) {
		var FlipModule = require('org.bcbhh.IosFlipView');
		var self = FlipModule.createView({
			startPage : (options.startPage) ? options.startPage : undefined,
			transitionDuration : 0.4,
			left : 0,
			right : 0,
			top : GLOBALS.TOPBARHEIGHT,
			bottom : GLOBALS.BOTTOMBARHEIGHT,
			backgroundColor : 'white',
			width : GLOBALS.SCREENWIDTH,
			pages : options.pages,
			tapRecognitionMargin : 1,
			swipeThreshold : 120,
			swipeEscapeVelocity: 650,
			bounceRatio: 0.3,  // default 0.3
			rubberBandRatio: 0.6666, // default 0.6666
			total : total
		});
		self.peakNext = self.bounceForward;
		self.addEventListener('change', function(_e) {
			options.onflipend && options.onflipend({
				current : _e.source.currentPage,
				total : total,
				pagecount : total
			});
		});
		return self;
	}
};

/*Methods:

 bounceForward, bounceBackward for programmatic bouncing
 Properties:
 tapRecognitionMargin

 swipeThreshold (float, default 125.0)
 swipeEscapeVelocity ( float, default 650.0) points/sec. defines, when animated flip
 is triggered
 bounceRatio (float, default 0.3) bounce level when doing programmatic
 bounce
 rubberBandRatio (float, default 0.67) level to which first/last page
 can be flipped*/
