var isAndroid = (Ti.Platform.osname === 'android') ? true : false;

var Widget = function(_args) {
	var self = Ti.UI.createView({
		width : '90%',
		height : 72, //@see https://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0Bx4BSt6jniD7V1hoemJNQk5UQlU/components_textfields_labels5.png
		windowSoftInputMode : isAndroid ? Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN : undefined
	});
	self.add(Ti.UI.createLabel({
		height : 28,
		top : 23,
		font : {
			fontSize : 16
		},
		opacity : 0.7,
		left : 0
	}));
	self.add(Ti.UI.createTextField({
		width : '99%',
		height : isAndroid ? 37 : 28,
		top : 23,
		backgroundColor : 'transparent',
		font : {
			fontSize : 16
		},
		color : '#444'
	}));
	self.add(Ti.UI.createView({
		width : '100%',
		height : 2,
		bottom : 15
	}));

	/** @author: Nádson Fernando
	 *  @email: nadsonfernando1@gmail.com
	 *  @description: controller input
	 *  @version: 1.0
	 */

	//arguments
	var args = arguments[0] || {};

	//config references this
	var _config = {
		color : {
			pattern : '#aaa',
			post : '#208FE5',
			exceedingColor : "FF0000"
		},
		duration : 200,
		editable : true,
		exceeding : false
	};

	//declare events in object
	var _events = {
		CLICK : 'click',
		FOCUS : 'focus',
		BLUR : 'blur',
		CHANGE : 'change'
	};
	var _animation = {
		ANIMATION_UP : function() {
			if (!_config.editable)
				return;
			var lenHint = self.children[0].getText().length;
			var color = _config.exceeding ? _config.color.exceeding : _config.color.post;
			lenHint += lenHint * (Number(lenHint) > 25 ? 0.20 : 0.10);
			self.children[0].animate({
				"top" : 0,
				"color" : color,
				"transform" : Ti.UI.create2DMatrix().scale(0.7),
				"left" : Ti.Platform.osname == "android" ? (-lenHint + 2) : -lenHint, //Fix hint being cut off on Android
				"duration" : _config.duration
			});
			self.children[2].animate({
				"backgroundColor" : color,
			});
		},
		ANIMATION_DOWN : function() {
			if (!_config.editable)
				return;
			var lenHint = self.children[0].getText().length;
			var color = _config.exceeding ? _config.color.exceeding : _config.color.pattern;
			lenHint += lenHint * (Number(lenHint) > 25 ? 0.20 : 0.10);
			self.children[2].animate({
				"backgroundColor" : color
			});
			var attrsHint = {
				"top" : self.children[1].top,
				"color" : color,
				"transform" : Ti.UI.create2DMatrix().scale(1),
				"left" : 0,
				"duration" : _config.duration
			};
			if (self.children[1].getValue()) {
				attrsHint["top"] = 0;
				attrsHint["transform"] = Ti.UI.create2DMatrix().scale(0.7);
				attrsHint["left"] = -lenHint;
			}
			self.children[0].animate(attrsHint);
		}
	};

	self.children[1].addEventListener(_events.FOCUS, _animation.ANIMATION_UP);
	self.children[1].addEventListener(_events.BLUR, _animation.ANIMATION_DOWN);
	(function() {
		_config.color.post = args.colorFocus || _config.color.post;
		_config.color.pattern = args.colorPattern || _config.color.pattern;
		_config.color.exceeding = args.exceedingColor || "#FF0000";
		_config.duration = args.animationDuration || _config.duration;
		var _init = {
			titleHint : args.titleHint,
			width : args.width,
			top : args.top,
			left : args.left,
			right : args.right,
			bottom : args.bottom,
			colorFont : args.colorFont,
			keyboardType : args.keyboardType,
			returnKey : args.returnKey,
			password : args.password,
			editable : args.editable,
			maxLength : args.maxLength,
			minLength : args.minLength
		};
		if ( typeof _init.editable == "string")
			_init.editable = eval(_init.editable);
		if (!_init.titleHint)
			self.children[0].setVisible(false);
		if (_init.width)
			self.setWidth(_init.width);
		if (_init.top)
			self.setTop(_init.top);
		if (_init.bottom)
			self.setBottom(_init.bottom);
		if (_init.left)
			self.setLeft(_init.left);
		if (_init.right)
			self.setRight(_init.right);
		if (_init.colorFont)
			self.children[1].setColor(_init.colorFont);
		if (_init.keyboardType)
			self.children[1].setKeyboardType(_init.keyboardType);
		if (_init.returnKey)
			self.children[1].setReturnKeyType(_init.returnKey);
		if (_init.password)
			self.children[1].setPasswordMask(_init.password);
		self.children[0].setText(_init.titleHint);
		self.children[0].setColor(_config.color.pattern);
		self.children[2].setBackgroundColor(_config.color.pattern);
		if (_init.editable == false) {
			self.setOpacity(0.3);
			self.children[1].setEditable(false);
			_config.editable = false;
		}
		if (_init.maxLength > 0) {
			var counter = Ti.UI.createLabel({
				height : 15,
				width : 64,
				font : {
					fontSize : 11
				},
				opacity : 0.7,
				right : -64, //Stay out of the screen on init, will animate in upon change event
				textAlign : "right",
				bottom : 0
			});
			self.add(counter);
			//Add on change event listener
			self.children[1].addEventListener(_events.CHANGE, function(event) {
                var length = self.children[1].getValue().length;
				//Animate check
				if (length == 0) {
					counter.animate({
						right : -64,
						duration : 350
					});
					//Animate out
					return;
				} else if (length >= 1)
					counter.animate({
						right : 0,
						duration : 350
					});
				//Animate in
				//Check minLength value or maxLength value
				if (length < _init.minLength || length > _init.maxLength) {
					//Set flag for next focus / blur event
					_config.exceeding = true;
					//Set exceeding color
					self.children[2].backgroundColor = _config.color.exceeding;
					counter.color = _config.color.exceeding;
					self.children[0].color = _config.color.exceeding;
				} else if (self.children[2].backgroundColor != _config.color.post) {
					//Set flag for next focus / blur event
					_config.exceeding = false;
					//Reset to color back to normal1
					self.children[2].backgroundColor = _config.color.post;
					counter.color = "#000";
					self.children[0].color = _config.color.post;
				}
				//Update label
				counter.setText(length + " / " + _init.maxLength);
			});
		}
	})();
	self.getValue = function() {
		return self.children[1].getValue();
	};
	self.ANIMATION_UP = function() {
		_animation.ANIMATION_UP();
	};
	self.ANIMATION_DOWN = function() {
		_animation.ANIMATION_DOWN();
	};
	self.setValue = function(value, up) {
		if (up)
			_animation.ANIMATION_UP();
		self.children[1].setValue(value);
		self.children[1].fireEvent(_events.CHANGE, {}); //hier das Event feuern, der Payload kann leer bleiben
	};
	self.addEventListener = function(event, callback) {
		self.children[1].addEventListener(event, function(e) {
			callback(e);
		});
	};
	self.removeEventListener = function(event, callback) {
		self.children[1].removeEventListener(event, function(e) {
			callback(e);
		});
	};
	self.blur = function(toFocus) {
		self.children[1].blur();
	};
	self.focus = function() {
		self.children[1].focus();
	};
	return self;
};

exports.createView = function(args) {
	return new Widget(args);
};
