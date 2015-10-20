
module.exports = function() {
	return require('de.appwerft.customsplitview')({
		navigation : {
			itemLongWidth : 200,
			itemShortWidth : 80
		},
		items : require('model/mockdata')
	});
};
