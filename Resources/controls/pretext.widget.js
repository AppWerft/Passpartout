exports.add = function(PDF, MODEL, UI) {
	console.log(UI.content.pretext);
	PDF.setFontSize(UI.fontsize);
	
	PDF.addTextBox(MODEL.content.pretext, Math.abs(UI.content.pretext[0]), Math.abs(UI.content.pretext[1]),UI.content.pretext[2] );
	return PDF.autoTableEndPosY();
};
