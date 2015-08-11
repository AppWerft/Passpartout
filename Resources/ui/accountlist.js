var GLOBALS = require('GLOBALS');

module.exports = function() {
	var  args = arguments[0] || {};
	var self = require('ui/window')();
	var rows = [];
	for (var i = 0; i < 100; i++) {
		rows.push({
			title : require('vendor/loremipsum')(4),
			itemId: i
		});
	}
	var list = Ti.UI.createTableView({
		data : rows
	});
	list.addEventListener('click', function(_e) {
		console.log(args.parent);
		console.log(args.parent.apiName);
		
		args.parent.fireEvent('openView', {
			payload : _e.rowData.itemId
		});
	});
	self.add(list);
	return self;
};
