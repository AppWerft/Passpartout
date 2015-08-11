var GLOBALS = require('GLOBALS');

module.exports = function() {
	var args = arguments[0] || {};
	var rows = [];
	for (var i = 0; i < 23; i++) {
		rows[i] = Ti.UI.createTableViewRow({
			itemId : i
		});
		rows[i].add(Ti.UI.createImageView({
			image : 'http://lorempixel.com/g/200/200/?' + Math.random(),
			top : 0,
			borderRadius : 20,
			left : 0,
			width : 40,
			height : 40
		}));
		rows[i].add(Ti.UI.createLabel({
			text : require('vendor/loremipsum')(4),
			left : 50,
			top : 5,
			right : 10,
			height : 70,
			color : '#444',
			font : {
				fontSize : 22
			}
		}));
	}

	var self = Ti.UI.createTableView({
		data : rows
	});
	self.addEventListener('click', function(_e) {
		args.parent && args.parent.fireEvent('opensecondlevel', {
			payload : _e.rowData.itemId
		});
	});

	return self;
};
