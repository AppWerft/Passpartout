exports.add = function(PDF, MODEL, UI) {
	PDF.setFontSize(UI.fontsize);
	// only on first page */
	if (UI.provider.address.page == undefined || UI.provider.address.page=="all" || ( PDF.internal.getCurrentPageInfo().pageNumber==1 && UI.provider.address.page=="first")) {
		Object.getOwnPropertyNames(MODEL.provider.address).forEach(function(key) {
			PDF.addText(MODEL.provider.address[key], UI.provider.address.position[key]);
		});
	}
};
