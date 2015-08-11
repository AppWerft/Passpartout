module.exports = function() {
	var self = require('ui/window')({
		backgroundColor : 'yellow'
	});
	self.add(Ti.UI.createLabel({
		text : require('vendor/loremipsum')(),
		top : 10,
		color : '#444',
		font : {
			fonzSize : 30
		},
		left : 10,
		right : 10
	}));
	return self;
};
