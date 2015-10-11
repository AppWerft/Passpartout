! function() {
	//var tabGroup = require('ui/tabgroup')().open();
			Ti.UI.backgroundColor = '#fc0';
	var tabGroup = require('ti.customtabgroup');
	var win = Ti.UI.createWindow({
		fullscreen : false,
		tabBarHidden : true,
		translucent : false,
		barColor : '#fc0',
		backgroundColor : 'transparent'
	});
	win.addEventListener('open', function(_e) {
		Ti.Android && _e.source.activity.actionBar.hide();
	});
	win.open();
	win.add(tabGroup.createView({
		navigation : {
			fullscreen : win.getFullScreen(),
			position : 'top',
			height : 66,
			backgroundColor : '#ffc0',
			backgroundActiveColor : '#ffa0',
			fontSize : 23,
			tabWidth : 195,
			activeTab : 0,
			color : '#f333',
			activeColor : '#ffff'
		},
		tabs : [{
			title : 'Inputs',
			view : require('ui/inputs.container')()
		}, {
			title : 'PDF',
			view : require('ui/pdf.container')()
		}, {
			title : 'Invoices',
			view : Ti.UI.createView({
				backgroundColor : '#777'
			})
		}, {
			title : 'Configuration',
			view : Ti.UI.createView({
				backgroundColor : '#222'
			})
		}, {
			title : 'Help',
			view : Ti.UI.createView({
				backgroundColor : '#666'
			})
		}]
	}));
}();
