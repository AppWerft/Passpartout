module.exports = function() {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true,
		title : 'Title of this page'
	});
	Object.getOwnPropertyNames(options).forEach(function(key) {
		if (key != 'children')
			self[key] = options[key];
	});
	if (options.children && Array.isArray(options.children))
		options.children.forEach(function(children) {
			self.add(children);
		});
	return self;
};
