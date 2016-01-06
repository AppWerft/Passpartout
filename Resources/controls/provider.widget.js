exports.add = function(PDF,MODEL,UI){
	var keys = "email web phone fax cto contact_name".split(' ');
	PDF.setFontSize(UI.fontsize);
	keys.forEach(function(key){
		console.log(MODEL.provider[key].label+' ≈label '+UI.provider[key].label);
		console.log(MODEL.provider[key].valuel+' ≈value '+UI.provider[key].value);
		PDF.addText(MODEL.provider[key].label,UI.provider[key].label);
		PDF.addText(MODEL.provider[key].value,UI.provider[key].label);
	});
};
