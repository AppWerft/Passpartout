var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		title : 'List of projects',
		backgroundColor : 'white',
		layout : 'vertical'
	});
	var MaterialTextfield = require('vendor/materialtextfield');
	var firstInput =MaterialTextfield.createView({
		titleHint : 'TitleHint1',
		top : 50
	}); 
	//firstInput.test();
	self.add(firstInput);
	self.add(MaterialTextfield.createView({
		titleHint : 'TitleHint2',
		top : 50
	}));
	return self;
};
