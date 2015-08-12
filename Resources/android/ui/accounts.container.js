var GLOBALS = require('GLOBALS');
module.exports = function() {
	/* Here is all logic to build different ui for all platforms*/
	if (GLOBALS.isTablet) {
		/* iPad: SplitView with navigationwindow on right side*/
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
		}), Ti.UI.createView()];
		self.detailView = Ti.UI.createScrollableView({
			left : 0,
			top : 0,
			backgroundImage : '/grid.png',
			scrollingEnabled : false,
			views : views,
			width : Ti.UI.FILL
		});
		self.headLine = Ti.UI.createView({
			backgroundColor : '#ddd',
			top : 0,
			height : 50
		});
		self.headLine.add(Ti.UI.createLabel({
			text : 'Überschrift'
		}));
		self.add(self.masterView);
		//self.add(self.headLine);
		self.add(self.detailView);
		self.addEventListener('selectaccount', function(_e) {
			self.detailView.animate({
				top : 50
			});
			views[0].opacity = 0.4;
			views[0].left = -200;
			views[0] = require('ui/window')({
				title : 'Bookings in this account (#' + (_e.payload + 1) + ')',
				children : [require('ui/bookingsbyaccount.list')({
					parent : self
				})]
			});
			// forced rerendering!
			self.detailView.setViews(views);
			views[0].animate({
				opacity : 1,
				left : 0,
				duration : 700
			});
		});
		self.addEventListener('selectbooking', function(_e) {
			var container = require('ui/window')({
				title : 'This booking (#' + (_e.payload + 1) + ')'
			});
			container.add(require('ui/booking')({
				parent : self
			}));
			self.getDetailView().openWindow(container);
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
				title : 'Bookings in this account (#' + (_e.payload + 1) + ')'
			});
			nextwindow.add(require('ui/bookingsbyaccount.list')({
				parent : self
			}));
			nextwindow.open();
		});
		self.addEventListener('selectbooking', function(_e) {
			var nextwindow = require('ui/window')({
				title : 'This booking (#' + (_e.payload + 1) + ')',
				children : [require('ui/booking')({
					parent : nextwindow
				})]
			});
			nextwindow.open();
		});
	}
	return self;
};
