var GLOBALS = require('GLOBALS');

module.exports = function() {
	var args = arguments[0] || {};
	var self = Ti.UI.createView({
		layout : 'vertical',
		scrollType : 'vertical',
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,

	});
	self.add(Ti.UI.createImageView({
		image : 'http://lorempixel.com/g/200/200/?' + Math.random(),
		top : 5,
		borderRadius : 100,
		width : 200,
		height : 200
	}));
	self.add(Ti.UI.createLabel({
		text : require('vendor/loremipsum')(4),
		left : 10,
		top : 10,
		right : 10,
		height : Ti.UI.SIZE,
		color : '#444',
		font : {
			fontSize : 22
		}
	}));
	self.addEventListener('click', function(_e) {
		args.parent && args.parent.fireEvent('opensecondlevel', {
			payload : _e.rowData.itemId
		});
	});

	return self;
};
