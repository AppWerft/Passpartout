exports.add = function(PDF,MODEL,UI){
	var keys = "email web phone fax cto contact_name".split(' ');
	PDF.setFontSize(UI.fontsize);
	keys.forEach(function(key){
		PDF.addText(MODEL.provider[key].label,UI.provider[key].label);
		PDF.addText(MODEL.provider[key].value,UI.provider[key].label);
	});
};
