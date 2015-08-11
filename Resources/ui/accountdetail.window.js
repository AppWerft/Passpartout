module.exports = function() {
	var args = arguments[0] || {};
	console.log(args);
	if (args.parent) {
		/* iPhone/iPod: we can use the parent window (tabgroup) to navigate*/
		var self = require('ui/window')({
			backgroundColor : 'yellow',
			navBarHidden : false,title:'List of bookings'
		});
		self.add(require('ui/accountdetails.list')({
			parent : self
		}));
		self.addEventListener('openView', function() {
			args.parent.openWindow(require('ui/window')());
		});
	} else {
		/* iPhone/iPod we create a new Navigationgroup */
		var self = Ti.UI.iOS.createNavigationWindow({		});
		var window = require('ui/window')({
		});
		window.add(require('ui/accountdetails.list')({
			parent : self
		}));
		self.setWindow(window);
		self.addEventListener('openView', function() {
			self.openWindow(require('ui/window')());
		});
	}
	return self;
};
