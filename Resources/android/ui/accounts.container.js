var GLOBALS = require('GLOBALS');
var ActionBar = require('com.alcoapps.actionbarextras');

/*
 *
 Version for Android
 *
 * */

const BOOKINGSOFACCOUNT = 0,
    BOOKING = 1,
    HEADER = 0,
    BODY = 1,
    DECO = 2;
const NAVBARHEIGHT = 50;

module.exports = function() {
	/* Here is all logic to build different ui for all platforms*/
	if (GLOBALS.isTablet) {
		var self = require('ui/window')({
			title : 'List of my accounts',
			layout : 'horizontal',

			horizontalWrap : false
		});
		self.masterView = Ti.UI.createView({
			left : 0,
			width : '25%',
			borderWidth : 0.5,
			borderColor : 'silver'
		});
		self.masterView.add(require('ui/accounts.list')({
			parent : self
		}));
		/* reference of all views (in this case 2) for scrollable view */
		var views = [Ti.UI.createView(), Ti.UI.createView()];
		// Level 2
		views[BOOKINGSOFACCOUNT].add(require('ui/navbar.widget')({
			title : ''
		}));
		views[BOOKINGSOFACCOUNT].add(Ti.UI.createView({
			top : NAVBARHEIGHT
		}));
		// this will removed and is only  vor filling the empty view
		views[BOOKINGSOFACCOUNT].add(Ti.UI.createImageView({
			image : 'http://lorempixel.com/g/1024/768/business/?' + Math.random(),
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,

		}));
		// Level 3
		views[BOOKING].add(require('ui/navbar.widget')({
			title : 'Booking'
		}));
		views[BOOKING].add(Ti.UI.createView({
			top : NAVBARHEIGHT
		}));

		// container for headline and subviews (as scrollable view)
		self.detailView = Ti.UI.createScrollableView({
			left : 0,
			top : 0,
			views : views,
			scrollingEnabled : false,
			backgroundColor : 'gray',
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		});

		/*self.headLineText.addEventListener('singletap', function() {
		 subviewcontainer && subviewcontainer.scrollToView(0);
		 });*/
		self.add(self.masterView);
		self.add(self.detailView);

		/* user selected account => we show in views[0] the list of BOOKINGSOFACCOUNT of this account */
		self.addEventListener('selectaccount', function(_e) {
			/* removing dummy preview */
			if (views[BOOKINGSOFACCOUNT].children.length > 2) {
				views[BOOKINGSOFACCOUNT].remove(views[BOOKINGSOFACCOUNT].children[DECO]);
			}
			var accountlabel = views[BOOKINGSOFACCOUNT].children[HEADER].headLineText;
			accountlabel.setText('Bookings in this account (#' + (_e.payload + 1) + ')');
			self.detailView.scrollToView(BOOKINGSOFACCOUNT);
			views[BOOKINGSOFACCOUNT].children[BODY].removeAllChildren();
			views[BOOKINGSOFACCOUNT].children[BODY].add(require('ui/bookingsbyaccount.list')({
				parent : self
			}));
		});
		views[BOOKING].children[HEADER].addEventListener('singletap',function(){
			views[BOOKING].children[BODY].removeAllChildren();
			self.detailView.scrollToView(BOOKINGSOFACCOUNT);
		});
		self.addEventListener('selectbooking', function(_e) {
			views[BOOKING].children[HEADER].headLineText.setText('<  This booking (#' + (_e.payload + 1) + ')');
			var pages = [];
			for (var i = 0; i < 23; i++) {
				pages.push(require('ui/booking')({
					parent : self
				}));
			}
			views[BOOKING].children[BODY].removeAllChildren();
			views[BOOKING].children[BODY].add(require('vendor/pageflip.widget')({
				pages : pages,
				startPage : _e.payload,
				onflipend : function(_res) {
					views[BOOKING].children[HEADER].headLineText.setText('<  Booking (#' + _res.current + ')');
				}
			}));
			self.detailView.scrollToView(BOOKING);
			setTimeout(function() {
				views[BOOKING].children[BODY].children[0].peakNext(true);
			}, 700);
		});
	} else {

		/* Handheld: all ist standard window stack*/
		var self = require('ui/window')({
			title : 'List of my accounts'
		});
		self.add(require('ui/accounts.list')({
			parent : self
		}));
		self.addEventListener('selectaccount', function(_e) {
			var nextwindow = require('ui/window')({
				title : 'Account (#' + (_e.payload + 1) + ')',
				onopen : require('ui/main.actionbar'),
				subtitle : 'All BOOKINGSOFACCOUNT of this account'
			});
			nextwindow.add(require('ui/bookingsbyaccount.list')({
				parent : self
			}));
			nextwindow.open();
		});
		self.addEventListener('selectbooking', function(_e) {
			var pages = [];
			for (var i = 0; i < 23; i++) {
				pages.push(require('ui/booking')({
					parent : nextwindow
				}));
			}
			var nextwindow = require('ui/window')({
				title : 'This booking (#' + (_e.payload + 1) + ')',
				subtitle : 'Account: XYZ',
				children : [require('vendor/pageflip.widget')({
					pages : pages,
					startPage : _e.payload,
					onflipend : function(_res) {
						ActionBar.setTitle('Booking (#' + (_res.current + 1) + ')');
					}
				})],
				onopen : require('ui/main.actionbar')
			});
			nextwindow.open();
			setTimeout(function() {
				nextwindow.children[0].peakNext(true);
			}, 700);
		});
	}
	return self;
};
