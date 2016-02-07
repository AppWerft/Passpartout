exports.add = function(PDF, MODEL, UI) {
	var keys = "email web phone fax cto contact_name legal_form".split(' ');
	PDF.setFontSize(UI.fontsize);
	keys.forEach(function(key) {
		console.log('≈≈≈≈≈ ' + key);
		console.log(MODEL.provider[key].label + '.label ' + UI.provider[key].label[0] + ' ' + UI.provider[key].label[1]);
		PDF.addText(MODEL.provider[key].label, UI.provider[key].label);
		PDF.addText(MODEL.provider[key].value, UI.provider[key].value);
	});
};
  