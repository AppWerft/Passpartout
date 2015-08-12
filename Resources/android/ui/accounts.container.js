var GLOBALS = require('GLOBALS');
module.exports = function() {
	/* Here is all logic to build different ui for all platforms*/
	if (GLOBALS.isTablet) {
		/* iPad: SplitView with navigationwindow on right side*/

		var self = Ti.UI.iOS.createSplitWindow({});
		// left side:
		self.setMasterView(require('ui/window')({
			children : [require('ui/accounts.list')({
				parent : self
			})]
		}));
		// right side
		self.setDetailView(Ti.UI.createImageView({
			image : 'http://lorempixel.com/1024/768/business/?' + Math.random(),
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
		}));
		self.addEventListener('selectaccount', function(_e) {
			self.setDetailView(Ti.UI.iOS.createNavigationWindow({
				window : require('ui/window')({
					title : 'Bookings in this account (#' + (_e.payload + 1) + ')',
					children : [require('ui/bookingsbyaccount.list')({
						parent : self
					})]
				})
			}));
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
