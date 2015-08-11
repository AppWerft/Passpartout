module.exports = function() {
	var args = arguments[0] || {};
	var rows = [];
	for (var i = 0; i < 100; i++) {
		rows[i] = Ti.UI.createTableViewRow({
			itemId : i,
			height : Ti.UI.SIZE
		});
		rows[i].add(Ti.UI.createLabel({
			top : 10,
			left : 10,
			right : 10,
			text : require('vendor/loremipsum')(4),
		}));
	}
	var list = Ti.UI.createTableView({
		data : rows
	});
	list.addEventListener('click', function(e) {
		args.parent && args.parent.fireEvent('openView', {
			payload : e.rowData.itemId
		});
	});
	return list;
};
