var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		title : 'List of projects',
		backgroundColor : 'white',
		
	});
	var container = Ti.UI.createScrollView({layout : 'vertical',scrollType:'vertical'});
	self.add(container);
	var MaterialTextfield = require('de.appwerft.materialdesigntextfield');
	
	var firstInput = MaterialTextfield.createView({
		titleHint : 'TitleHint1',
		verysecret : true,  // only * , no characters
		top : 50
	}); 
	//firstInput.test();
	container.add(firstInput);
	container.add(MaterialTextfield.createView({
		titleHint : 'Zweites Eingabefeld',
		top : 50
	}));
	container.add(MaterialTextfield.createView({
		titleHint : 'Drittes Eingabefeld',
		top : 50
	}));
	return self;
};