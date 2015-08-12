var GLOBALS = require('GLOBALS');
var ActionBar = require('com.alcoapps.actionbarextras');

/*
 *
 *
 Version for Android
 *
 *
 * */
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

		/* reference of all views (in this case 2) for crollable view */
		var views = [Ti.UI.createImageView({
			image : 'http://lorempixel.com/g/1024/768/business/?' + Math.random(),
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
		}), Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		})];
		// container for headline and subviews (as scrollable view)
		self.detailView = Ti.UI.createView({
			layout : 'vertical',
			left : 0,
			top : 0,
			backgroundColor : 'gray',
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		});
		self.headLine = Ti.UI.createView({
			backgroundColor : '#666',
			top : 0,
			height : 0 /* initial hiding of headline */
		});
		self.headLineText = Ti.UI.createLabel({
			text : 'Überschrift',
			color : 'white',
			left : 20,
			textAlign : 'left',
			width : Ti.UI.FILL,
			font : {
				fontSize : 20
			}
		});
		self.headLine.add(self.headLineText);
		var subviewcontainer = Ti.UI.createScrollableView({
			left : 0,
			top : 0,
			backgroundImage : '/grid.png',
			scrollingEnabled : false,
			views : views,
			width : Ti.UI.FILL
		});
		self.add(self.masterView);
		self.add(self.detailView);
		self.detailView.add(self.headLine);
		self.detailView.add(subviewcontainer);
		self.addEventListener('selectaccount', function(_e) {
			self.headLine.animate({
				height : 50
			});
			self.headLineText.setText('Bookings in this account (#' + (_e.payload + 1) + ')');
			subviewcontainer.scrollToView(0);
			views[0].opacity = 0.8;
			views[0] = require('ui/bookingsbyaccount.list')({
				parent : self
			});
			// forced rerendering!
			subviewcontainer.setViews(views);
			views[0].animate({
				opacity : 1,
				left : 0,
				duration : 700
			});
		});
		self.addEventListener('selectbooking', function(_e) {
			self.headLineText.setText('<  This booking (#' + (_e.payload + 1) + ')');
			var pages = [];
			for (var i = 0; i < 23; i++) {
				pages.push(require('ui/booking')({
					parent : self
				}));
			}
			views[1] = require('vendor/pageflip.widget')({
				pages : pages,
				startPage : _e.payload,
				onflipend : function(_res) {
					self.headLineText.setText('<  Booking (#' + _res.current + ')');
				}
			});

			/*
			 views[1] = require('ui/booking')({
			 parent : self
			 });*/
			subviewcontainer.setViews(views);
			subviewcontainer.scrollToView(1);
			setTimeout(function() {
				views[1].peakNext(true);
			}, 700);
		});
		subviewcontainer.addEventListener('scrollend', function(_e) {
			console.log(_e.currentPage);
			subviewcontainer.setScrollingEnabled(_e.currentPage == 0 ? false : false);
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
				subtitle : 'All bookings of this account'
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
