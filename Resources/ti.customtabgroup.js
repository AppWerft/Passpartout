var ldf = Ti.Platform.displayCaps.logicalDensityFactor || 1;
/* Deciding device class */
var maxwidth = Math.max(Ti.Platform.displayCaps.platformHeight / ldf, Ti.Platform.displayCaps.platformWidth / ldf);
const isTablet = Ti.Platform.osname === 'ipad' || (Ti.Platform.osname === 'android' && (maxwidth > 899 )),
    isHandheld = !isTablet;

var Module = function(args) {
	var self = Ti.UI.createView({
	});
	var position = args.navigation.position || 'top',
	    nav = args.navigation,
	    naviwidth = 0,
	    screenwidth = 0;
	var activeTab = nav.activeTab || 0;
	self.add(Ti.UI.createScrollableView({
		top : position == 'top' ? nav.height : undefined,
		bottom : position == 'bottom' ? nav.height : undefined,
		views : args.tabs.map(function(tab) {
			return tab.view;
		}),
		scrollingEnabled : false
	}));
	/*
	now we go separated ways for handheld and tablet 
	*/
	switch (true) {
	case args.tablet || isTablet :
		/* tablet */	
		self.add(Ti.UI.createScrollView({
			top : position == 'top' ? 0 : undefined,
			bottom : position == 'bottom' ? 0 : undefined,
			height : nav.height,
			scrollType : 'horizontal',
			contentWidth : Ti.UI.SIZE,
			backgroundColor : nav.backgroundColor,
		}));
		var handler = Ti.UI.createView({
			width : nav.tabWidth,
			touchEnabled : false,
			left : activeTab * nav.tabWidth,
			backgroundColor : nav.backgroundActiveColor
		});

		args.tabs.forEach(function(tab, ndx) {
			var color = ndx == nav.activeTab ? nav.activeColor : nav.color;
			console.log(color + ' ' + ndx + '   ' + nav.activeTab);
			self.children[0].add(Ti.UI.createLabel({
				width : nav.tabWidth,
				left : nav.tabWidth * ndx,
				textAlign : 'center',
				itemId : ndx,
				color : color,
				zIndex : 99,
				font : {
					fontSize : nav.fontSize,
					fontWeigth : 'bold'
				},
				text : tab.title.toUpperCase()
			}));
			naviwidth += nav.tabWidth;
		});
		self.children[0].add(handler);
		self.children[0].addEventListener('singletap', function(_e) {
			if (_e.source.itemId == undefined)
				return;
			var ndx = _e.source.itemId;
			self.children[0].children[activeTab].color = nav.color;
			self.children[0].children[ndx].color = nav.activeColor;
			handler.animate({
				left : nav.tabWidth * ndx
			}, function() {

			});
			self.children[1].scrollToView(ndx);
			console.log('Info: scrolled to ' + ndx);
			var ldf = Ti.Platform.displayCaps.logicalDensityFactor || 1;
			if (Ti.Platform.displayCaps.platformWidth / ldf < naviwidth) {
				console.log(ndx + '  ' + args.tabs.length);
				switch (true) {
				case (ndx==0) :
					var x = 0;
					break;
				case (ndx==args.tabs.length-1) :
					var x = naviwidth - nav.tabWidth;
					break;
				default:
					var x = nav.tabWidth * ndx - nav.tabWidth / 2;
					break;
				}
			}
			self.children[0].setContentOffset({
				x : x,
				y : 0
			});
			activeTab = ndx;
		});
		break;
	case  args.handheld || isHandheld:
		/* handheld :  burgermneu */
		/* aliase: sliding menu, burger menu, drawer men
		/* we cannot use native Drawer or Burger menus, because dont't use native navigation like actionbar/ nanigationgroup
		 * https://github.com/viezel/NappDrawer
		 */
		break;
	}
	return self;
};

exports.createView = function(args) {
	return new Module(args);
};
