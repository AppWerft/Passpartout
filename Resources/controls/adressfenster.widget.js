exports.add = function(PDF, MODEL, UI) {
	
	PDF.setFontSize(UI.smallfontsize);
	PDF.addText(MODEL.provider.sender, UI.provider.sender);
	
	PDF.setFontSize(UI.fontsize);
	Object.getOwnPropertyNames(MODEL.client.address).forEach(function(key) {
		console.log(key);
		PDF.addText(MODEL.client.address[key], UI.client.address[key]);
	});
	
};
