var GLOBALS = require('GLOBALS');
module.exports = function() {
	var self = Ti.UI.createView({
		backgroundColor : '#666',
		top : 0,
		height : 50 /* initial hiding of headline */
	});
	self.headLineText = Ti.UI.createLabel({
		text : '',
		color : 'white',
		left : 20,
		textAlign : 'left',
		width : Ti.UI.FILL,
		font : {
			fontSize : 20
		}
	});
	self.add(self.headLineText);
	return self;
};
