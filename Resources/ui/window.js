module.exports = function() {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		backgroundColor : 'yellow',
		title : 'Title of this page'
	});
	Object.getOwnPropertyNames(options).forEach(function(key) {
		self[key] = options[key];
	});
	return self;
};
