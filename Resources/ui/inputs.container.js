var GLOBALS = require('GLOBALS');

module.exports = function() {
	
	var self = Ti.UI.createScrollView({
		layout : 'vertical',backgroundColor:'#888',
		scrollType : 'vertical'
	});
	var Textfield = require('de.appwerft.webtextfield');
	
	var firstInput = Textfield.createView({
		hintText : 'BankID',
		
	});
	//firstInput.test();
	self.add(firstInput);
	
	self.add(Textfield.createView({
		hintText : 'Passwort',
		passwordMask : true, // only * , no characters
	}));
	
	return self;
};
