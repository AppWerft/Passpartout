/*
Usage:

var SepaScanner = require(ti.sepascanner).createScanner();
SepaScanner.onSuccess = function(_result) {
	console.log(_result.amount);
};

*/

var Barcode = require('ti.barcode');
Barcode.allowRotation = false;
Barcode.displayedMessage = ' ';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = false;
var overlay = Ti.UI.createView({
    width : Ti.UI.FILL,
    heigth : Ti.UI.FILL,
    backgroundImage : 'overlay.png'
});
overlay.add(Ti.UI.createButton({
    title : 'Abbruch',
    bottom : 10,
    height : 50,
    width : '80%',
    color : '#333',
    borderColor : '#000',
    borderRadius : 10,
    borderWidth : 1,
    opacity : 0.2,
    style : 0,
    textAlign : 'center',
}));
var Scanner = function() {
	var _this = this;
    Barcode.capture({
        animate : true,
        showCancel : true,
        overlay : overlay,
        showRectangle : false,
        keepOpen : false,
        acceptedFormats : [Barcode.FORMAT_QR_CODE]
    });
    overlay.addEventListener('click', function() {
        console.log('scanner will canceled');
        Barcode.cancel();
    });
    Barcode.addEventListener('success', function(e) {
        var res = [];
        try {
            e.result.split('?')[1].split('&').forEach(function(item) {
                var foo = item.split('=');
                res[foo[0]] = decodeURIComponent(foo[1]);
            });
            _this.onSuccess && _this.onSuccess(res);
        } catch(E) {
            _this.onError && _this.onError(E);
        }
    });
    
};

exports.createScanner = function() {
	return new Scanner();
};
// improved version here: https://github.com/kosso/SquareCamera
// http://exygy.com/how-to-modify-ti-barcode-to-correct-two-annoying-behaviors-in-ios-and-android/