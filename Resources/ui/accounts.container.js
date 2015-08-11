var GLOBALS = require('GLOBALS');

module.exports = function() {
	/* Here is all logic to build different ui for all platforms*/
	switch (true) {
	/* iPad: SplitView with navgroup on right side*/
	case (GLOBALS.isPad ===true):
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
			self.setDetailView(require('ui/accountdetail.window')());
		});
		break;
	/* iPhone/iPod: Navigationgroup */
	case (GLOBALS.isIOS && GLOBALS.isHandheld):
		var self = Ti.UI.iOS.createNavigationWindow({		});
		self.setWindow(require('ui/accountlist')({
			parent : self,
			navBarHidden : true
		}));
		self.addEventListener('openView', function(_e) {
			self.openWindow(require('ui/accountdetail.window')());
		});
		break;
	}

	return self;
};
