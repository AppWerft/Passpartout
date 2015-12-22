exports.add = function(PDF,MODEL,UI){
	PDF.setFontSize(7);
	PDF.addText(MODEL.provider.sender, UI.provider.sender);
	PDF.setFontSize(UI.fontsize);
	Object.getOwnPropertyNames(MODEL.provider.address).forEach(function(key){
		PDF.addText(MODEL.provider.address[key],UI.provider.address[key]);
	});
};
