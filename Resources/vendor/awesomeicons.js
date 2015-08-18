var icons = require('/vendor/icons');

var Module = function(options) {
	this.color = options.color || 'gray';
	this.name = options.name || 'time';
	this.size = options.size || 10;
	var unit = Ti.App.Properties.getString('ti.ui.defaultunit', 'dp');
	if (!icons[this.name]) {
		console.log(this.name + ' not found');
		return null;
	}
	var filehandle = Ti.Filesystem.getFile(Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getExternalStorageDirectory() : Ti.Filesystem.getApplicationDataDirectory(), 'icon-' + this.name + '-' + this.size + '-' + this.color + '.png');
	if (!filehandle.exists() || true) {
		console.log('=========START ttf2png===========');
		var label = Ti.UI.createLabel({
			font : {
				fontFamily : 'AppIcons',
				fontSize : (this.size * 0.8) + unit,
				fontWeight : 'normal'
			},
			color : this.color,
			backgroundColor : 'transparent',
			height : this.size + unit,
			width : this.size + unit,
			text : icons[this.name],
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		console.log(label);
		var blob =  label.toImage();
		filehandle.write(blob);
		console.log(blob);
	}
	return filehandle.nativePath;
};

exports.createIcon = function(options) {
	return new Module(options);
};
