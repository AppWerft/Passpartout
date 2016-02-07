var GLOBALS = require('GLOBALS');

module.exports = function(pdfFile) {
	if (!pdfFile)
		return;
	var winPDF = Ti.UI.createWindow({
		backgroundColor : '#fc0',
		height : Ti.UI.FILL,
		top : 20,
		fullscreen : false,
		title : 'PDF Preview',
		width : Ti.UI.FILL
	});

	if (GLOBALS.isAndroid) {
		var pdfView = require("com.mykingdom.mupdf").createView({
			file : pdfFile
		});
		pdfView.setScrollingDirection(require("com.mykingdom.mupdf").DIRECTION_VERTICAL);
		winPDF.add(pdfView);
		winPDF.addEventListener('open', function() {
			winPDF.activity.actionBar.hide();
		});
		winPDF.open();

	} else if (GLOBALS.isIOS) {
		winPDF.open();
		var btnClose = Ti.UI.createButton({
			title : 'PDF close',
			height : 50,
			top : 20,
			right : 20
		});
		btnClose.addEventListener('click', function(e) {
			winPDF.close();
		});
		//winPDF.setRightNavButton(btnClose);
		var pdfview = Ti.UI.createWebView({
			backgroundColor : '#eee',
			url : pdfFile.nativePath,
			height : Ti.UI.FILL,
			width : Ti.UI.FILL
		});

		winPDF.add(pdfview);
		winPDF.add(btnClose);
	}
};

