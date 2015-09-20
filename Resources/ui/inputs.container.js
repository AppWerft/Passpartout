var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		title : 'List of projects',
		backgroundColor : '#666',

	});
	var container = Ti.UI.createScrollView({
		layout : 'vertical',
		scrollType : 'vertical'
	});
	self.add(container);
	var Textfield = require('de.appwerft.webtextfield');
	
	var firstInput = Textfield.createView({
		hintText : 'BankID',
		
	});
	//firstInput.test();
	container.add(firstInput);
	
	container.add(Textfield.createView({
		hintText : 'Passwort',
		passwordMask : true, // only * , no characters
	}));
	
	return self;
};
