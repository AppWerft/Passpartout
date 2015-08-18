var Module = function() {
	var self = Ti.UI.createButton({
		width : 40,
		height : 40,
		
		backgroundImage : 'assets/logout.png'
	});
	self.addEventListener('click', function() {
		var dialog = Ti.UI.createOptionDialog({
			cancel : 1,
			options : ['Ausloggen', 'Weiter machen'],
			selectedIndex : 0,
			destructive : 0,
			title : 'Sitzung beenden?'
		});
		dialog.show();
		dialog.addEventListener('click', function(_e) {
			if (_e.index == 0) {
				if (Module.onlogout && typeof Module.onlogout == 'function') {
					Module.onlogout();
				}
			}
		});
	});
	return self;
};
module.exports = Module;

