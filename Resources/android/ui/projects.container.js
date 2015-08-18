var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		title : 'List of projects',
		backgroundColor : 'white',
		layout : 'horizontal'
	});
	var AwesomeIcon = require('vendor/awesomeicons');
	var iSize = GLOBALS.isAndroid ? 72 : 36;
	self.add(Ti.UI.createImageView({
		image : AwesomeIcon.createIcon({
			name : 'search',
			size : 200,
			color : '#444'
		}),
		width : 200,
		height : 200
	}));
	return self;
};
