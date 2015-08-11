var GLOBALS = require('GLOBALS');

module.exports = function() {

	/* Here is all logic to build different ui for all platforms*/
	if (GLOBALS.isTablet) {
		/* iPad: SplitView with navigationwindow on right side*/

		var self = Ti.UI.iOS.createSplitWindow({});
		// left side:
		var container = require('ui/window')();
		container.add(require('ui/accounts.list')({
			parent : self
		}));
		self.setMasterView(container);
		// right side
		self.setDetailView(Ti.UI.createImageView({
			image : 'http://lorempixel.com/1024/768/business/?' + Math.random(),
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
		}));
		self.addEventListener('selectaccount', function(_e) {
			var container = require('ui/window')({
				title : 'Bookings in this account (#' + (_e.payload+1) + ')'
			});
			container.add(require('ui/bookingsbyaccount.list')({
				parent : self
			}));
			self.setDetailView(Ti.UI.iOS.createNavigationWindow({
				window : container
			}));
		});
		self.addEventListener('selectbooking', function(_e) {
			var container = require('ui/window')({
				title : 'This booking (#' + (_e.payload+1) + ')'
			});
			container.add(require('ui/booking')({
				parent : self
			}));
			self.getDetailView().openWindow(container);
		});
	} else {
		/* iPhone/iPod: Navigationgroup (automatic by using of tabgroup)*/
		var self = require('ui/window')({
			title : 'List of my accounts'
		});
		self.add(require('ui/accounts.list')({
			parent : self
		}));
		self.addEventListener('selectaccount', function(_e) {
			var container = require('ui/window')({
				parent: self,
				title : 'Bookings in this account (#' + (_e.payload+1) + ')'
			});
			container.add(require('ui/bookingsbyaccount.list')({
				parent : self
			}));
			self.tab.openWindow(container);
		});
		self.addEventListener('selectbooking', function(_e) {
			var container = require('ui/window')({
				parent: self,
				title : 'This booking (#' + (_e.payload+1) + ')'
			});
			container.add(require('ui/booking')({
				parent : self
			}));
			self.tab.openWindow(container);
		});

	}

	return self;
};
