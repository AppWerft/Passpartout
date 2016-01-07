exports.add = function(PDF, MODEL, UI) {
	PDF.setFontSize(UI.fontsize);
	PDF.addTextBox(MODEL.content.pretext, Math.abs(UI.content.pretext[0]), Math.abs(UI.content.pretext[1]),UI.content.pretext[2] );
	PDF.autoTableEndPosY();
};
