const WIDTH = 1000;

var Logo = function() {
	Ti.Media.openPhotoGallery({
		mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO],
		error : function() {
		},
		cancel : function() {
		},
		success : function(_e) {
			if (!_e.success)
				return;
			var rawImage = _e.media;
			var width = rawImage.getWidth();
			var height = rawImage.getHeight();
			var resizedImage = rawImage.imageAsResized(WIDTH, WIDTH * height / width);
			var ImageFactory = require('ti.imagefactory');
			ImageFactory.compress(resizedImage, 0.9);
			// converting zu JPG

		},
		autohide : true
	});
	return this;
};

exports.createLogo = function() {
	return new Logo();
};
