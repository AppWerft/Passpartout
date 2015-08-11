var GLOBALS = require('GLOBALS');

module.exports = function() {
	var args = arguments[0] || {};
	var rows = [];
	for (var i = 0; i < 23; i++) {
		rows[i] = Ti.UI.createTableViewRow({
			itemId : i
		});
		
		rows[i].add(Ti.UI.createLabel({
			text : require('vendor/loremipsum')(4),
			left : 10,
			top : 5,right:10,
			height : 35,
			color : '#444',
			font : {
				fontSize : 16
			}
		}));
	}

	var self = Ti.UI.createTableView({
		data : rows
	});
	self.addEventListener('click', function(_e) {
		console.log(args.parent.apiName);
		args.parent && args.parent.fireEvent('selectbooking', {
			payload : _e.rowData.itemId
		});
	});
	
	return self;
};
