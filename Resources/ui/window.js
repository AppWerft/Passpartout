var GLOBALS = require('GLOBALS');
module.exports = function() {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
	});
	Object.getOwnPropertyNames(options).forEach(function(key) {
		if (key != 'children' && key != 'onopen')
			self[key] = options[key];
	});
	if (options.children && Array.isArray(options.children))
		options.children.forEach(function(children) {
			self.add(children);
		});
	if (GLOBALS.isAndroid && options.onopen) {
		self.addEventListener('open', options.onopen);
	}
	return self;
};
