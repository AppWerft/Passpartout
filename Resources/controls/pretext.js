const X =0, Y=1;
exports.add = function(PDF,MODEL,UI){

	PDF.addTextBox(MODEL.content.pretext, Math.abs(UI.content.pretext[Y]), Math.abs(UI.content.pretext[Y]) + 10, PDF.internal.pageSize.width - Math.abs(UI.content.posttext[Y]));
	return PDF.autoTableEndPosY();
};
