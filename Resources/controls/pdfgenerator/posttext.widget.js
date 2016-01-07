exports.add = function(PDF, MODEL, UI) {
	var ypos = PDF.autoTableEndPosY() + Math.abs(UI.content.posttext[1]);
	var xpos = Math.abs(UI.content.posttext[0]);
	PDF.setFontSize(UI.fontsize);
	PDF.addTextBox(MODEL.content.posttext, xpos, ypos, UI.content.posttext[2]);
};
