! function() {
	var COOPERATEDESIGN = require('ui/util/corporateDesign.util');
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
			fullscreen : (win.fullscreen == true) ? true : false,
			position : 'top',
			height : 64,
			backgroundColor : COOPERATEDESIGN.colors.yellow,
			backgroundActiveColor : COOPERATEDESIGN.colors.yellowNavActive,
			fontSize : 14,
			fontFamily : COOPERATEDESIGN.font.roman,
			fontFamilyActive : COOPERATEDESIGN.font.bold,
			tabWidth : 120,
			activeTab : 0,
			color : COOPERATEDESIGN.colors.blue,
			activeColor : '#ffff',
			burgernav : {
				height : 40
			}
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
