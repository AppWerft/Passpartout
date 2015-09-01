var GLOBALS = require('GLOBALS');

module.exports = function() {
	var args = arguments[0] || {};
	var rows = [];
	for (var i = 0; i < 23; i++) {
		rows[i] = Ti.UI.createTableViewRow({
			itemId : i,
			ndx : i,
			backgroundColor : 'white',
			height : Ti.UI.SIZE,
			hasChild : true
		});
		rows[i].add(Ti.UI.createImageView({
			image : 'http://lorempixel.com/g/200/200/?' + Math.random(),
			top : 5,
			left : 5,
			bottom : 5,
			borderRadius : 40,
			width : 80,
			height : 80
		}));
		rows[i].add(Ti.UI.createLabel({
			text : require('vendor/loremipsum')(4),
			left : 95,
			top : 5,
			right : 10,
			height : 40,
			color : '#444',
			font : {
				fontSize : 18,
				fontFamily : 'Frutiger'
			}
		}));
	}
	var self = Ti.UI.createTableView({
		data : rows
	});
	self.addEventListener('click', function(_e) {
		rows.forEach(function(row) {
			if (row.isactive == true) {
				row.backgroundColor = 'white';
				row.isactive = false;
			}
		});
		_e.row.backgroundColor = '#ddd';
		_e.row.isactive = true;
		args.parent && args.parent.fireEvent('selectaccount', {
			payload : _e.rowData.itemId
		});
	});

	return self;
};
