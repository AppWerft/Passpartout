var GLOBALS = require('GLOBALS');

module.exports = function() {

	/* Here is all logic to build different ui for all platforms*/
	if (GLOBALS.isPad) {
		/* iPad: SplitView with navigationwindow on right side*/
		var self = Ti.UI.iOS.createSplitWindow({});
		self.setMasterView(require('ui/accountlist')({
			navBarHidden : true,
			parent : self
		}));
		self.setDetailView(Ti.UI.iOS.createNavigationWindow({
			window : require('ui/window')({
				navBarHidden : true
			})
		}));
		self.detailView.add(Ti.UI.createImageView({
			image : 'http://www.mostbeautifulthings.net/wp-content/uploads/2014/04/sweet-cats-1.jpg'
		}));
		self.addEventListener('openView', function(_e) {
			self.setDetailView(require('ui/accountdetail.window')(null));
		});
	} else {
		/* iPhone/iPod: Navigationgroup (automatic by using of tabgroup)*/
		var self = require('ui/window')({
			title : 'List of my accounts'
		});
		self.add(require('ui/accountlist')({
			parent : self
		}));
		self.addEventListener('openView', function(_e) {
			self.tab.openWindow(require('ui/accountdetail.window')({
				parent : self
			}));
		});

	}

	return self;
};
