! function() {
	var cd = require('ui/util/corporateDesign.util');
	/* aufrufparameter ist JSON string*/
	/*var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model/legals.txt');
	var json = JSON.parse(file.read().getText());
	var web = Ti.UI.createWebView({
		html : json.content
	});
	var win = Ti.UI.createWindow();
	win.addEventListener('open', function() {
		var view = Ti.UI.createScrollableView({
			top : 100,
			bottom : 100,
			views : [web, Ti.UI.createView(),Ti.UI.createView()]
		});
		win.add(view);
	});
	win.open();
	return;
*/
	//var tabGroup = require('ui/tabgroup')().open();
	Ti.UI.backgroundColor = '#f90';
	var tabGroup = require('ti.customtabgroup');
	var win = Ti.UI.createWindow({
		fullscreen : false,
		tabBarHidden : true,
		translucent : false,
		barColor : '#f90',
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
			tabWidth : 120,
			backgroundColor : cd.colors.yellow,
			backgroundActiveColor : cd.colors.yellowNavActive,
			fontSize : 14,
			fontFamily : cd.font.roman,
			fontFamilyActive : cd.font.bold,
			activeTab : 0,
			color : cd.colors.blue,
			activeColor : '#fff',
			// Settings for Burger-Navigation
			burgernav : {
				height : 40
			}
		},
		tabs : [{
			title : 'Inputs',
			view : require('ui/splitview.container')()
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
			title : 'BestSign',
			view : require('ui/bestsign')()
		}]
	}));
}();
