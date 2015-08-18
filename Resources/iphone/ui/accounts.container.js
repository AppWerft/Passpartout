var GLOBALS = require('GLOBALS');
module.exports = function() {
	var rightNavButton = require('ui/logoutbutton.widget')();
	/* Here is all logic to build different ui for all platforms*/
	if (GLOBALS.isPad) {
		/* iPad: SplitView with navigationwindow on right side*/
		var self = Ti.UI.createWindow({
			rightNavButton : rightNavButton,
			title : 'List of my accounts',
			barImage :'bgipad.png' 
		});
		self.splitwindow = Ti.UI.iOS.createSplitWindow({
		});
		self.add(Ti.UI.createScrollableView({
			views : [self.splitwindow]
		}));
		// left side:
		self.splitwindow.setMasterView(require('ui/window')({
			children : [require('ui/accounts.list')({
				parent : self
			})]
		}));
		// right side
		self.splitwindow.setDetailView(Ti.UI.createImageView({
			image : 'http://lorempixel.com/g/1024/768/business/?' + Math.random(),
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
		}));
		self.addEventListener('selectaccount', function(_e) {
			self.splitwindow.setDetailView(Ti.UI.iOS.createNavigationWindow({
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
			self.splitwindow.getDetailView().openWindow(container);
		});

	} else {
		/* iPhone/iPod: Navigationgroup (automatic by using of tabgroup)*/
		var self = require('ui/window')({
			title : 'List of my accounts',
			rightNavButton : rightNavButton,
			barImage : 'bgiphone.png',
		});
		self.add(require('ui/accounts.list')({
			parent : self
		}));
		self.addEventListener('selectaccount', function(_e) {
			self.tab.openWindow(require('ui/window')({
				parent : self,
				title : 'Bookings in this account (#' + (_e.payload + 1) + ')',
				children : [require('ui/bookingsbyaccount.list')({
					parent : self
				})]
			}));
		});
		self.addEventListener('selectbooking', function(_e) {
			var container = require('ui/window')({
				parent : self,
				title : 'This booking (#' + (_e.payload + 1) + ')'
			});
			container.add(require('ui/booking')({
				parent : self
			}));
			self.tab.openWindow(container);
		});

	}
	return self;
};
