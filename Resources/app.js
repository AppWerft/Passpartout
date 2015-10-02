! function() {
	//var tabGroup = require('ui/tabgroup')().open();
	 
	var tabGroup = require('ti.customtabgroup');
	var win = Ti.UI.createWindow({
		fullscreen : false,
		backgroundColor : 'white'
	});
	win.addEventListener('open', function(_e) {
		Ti.Android && _e.source.activity.actionBar.hide();
	});
	win.open();
	win.add(tabGroup.createView({
		navigation : {
			fullscreen : win.getFullScreen(),
			type : 'auto',  // 'handheld' || 'tablet'
			position : 0,
			height : 66,
			backgroundColor : '#fc0',
			backgroundActiveColor : '#fa0',
			fontSize : 24,
			tabWidth : 195,
			activeTab : 0,
			color : '#333',
			activeColor : 'white'
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
