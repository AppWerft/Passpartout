var GLOBALS = require('GLOBALS');

module.exports = function() {
	var self = require('ui/window')({
		backgroundColor : 'white',
	});
	var button = Ti.UI.createButton({
		top : 50,
		title : 'Generating of PDF',
		height : 50
	});
	self.add(button);
	button.addEventListener('click', function() {
		var pdf = require('controls/billgenerator')();
		if (Ti.Android) {
			var pdfView = require("com.mykingdom.mupdf").createView({
				file : pdf
			});
			pdfView.setScrollingDirection(require("com.mykingdom.mupdf").DIRECTION_VERTICAL);
			self.removeAllChildren();
			self.add(pdfView);
		} else {
			var winPDF = Ti.UI.createWindow({
				backgroundColor : '#eee',
				height : Ti.UI.FILL,
				title : 'PDF Preview',
				width : Ti.UI.FILL
			});
			var btnClose = Ti.UI.createButton({
				title : 'Close'
			});
			btnClose.addEventListener('click', function(e) {
				winPDF.close();
			});
			winPDF.setRightNavButton(btnClose);
			var pdfview = Ti.UI.createWebView({
				backgroundColor : '#eee',
				url : pdf.nativePath,
				height : Ti.UI.FILL,
				width : Ti.UI.FILL
			});
			winPDF.add(pdfview);
			winPDF.open({
				modal : true
			});
		}

	});

	return self;
};
