var CURRENT_ORIENTATION = (Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth)//
? Ti.UI.PORTRAIT : Ti.UI.LANDSCAPE_LEFT;

var Widget = function(args) {
	function setOrientationLayout() {
		CURRENT_ORIENTATION = (Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth)//
		? Ti.UI.PORTRAIT : Ti.UI.LANDSCAPE_LEFT;
		if (CURRENT_ORIENTATION == Ti.UI.PORTRAIT) {
			self.slideIn();
			self.rightContainer.setLeft(options.itemShortWidth);
		} else {
			self.slideOut();
			self.rightContainer.setLeft(options.itemLongWidth);
			self.darker.hide();
		}
	}

	var options = {
		activeMarkerWidth : args.navigation.activeMarkerWidth || 10,
		activeMarkerColor : args.navigation.activeMarkerColor || '#ef90',
		activeBackgroundColor : args.navigation.activeBackgroundColor || '#ddd',
		itemLongWidth : args.navigation.itemLongWidth || 200,
		itemShortWidth : args.navigation.itemShortWidth || 90,
		backgroundColor : args.navigation.backgroundColor || 'gray',
		darkerColor : args.navigation.darkerColor || '#8000',
		defaultIsout : args.defaultIsout || true,
		defaultContent : args.defaultContent || 0,
		navBarItemHeight : args.navBarItemHeight || 90,
		iconItemHeight : args.iconItemHeight || 80

	};
	var self = Ti.UI.createView({
		isOut : options.defaultIsout,
		activeItem : options.defaultContent
	});
	self.rightContainer = Ti.UI.createView({
		left : options.itemShortWidth,
		backgroundColor : '#f90',
		itemId : self.activeItem // default View
	});
	if (args.items[self.activeItem] && args.items[self.activeItem].contentView) {
		self.rightContainer.add(args.items[self.activeItem].contentView);
	}
	self.add(self.rightContainer);
	self.darker = Ti.UI.createView({
		backgroundColor : options.darkerColor,
		bubbleParent : false,
		visible : false,
		touchEnabled : true
	});
	self.add(self.darker);
	// Navi
	self.navBar = Ti.UI.createView({
		scrollType : 'vertical',
		layout : 'vertical',
		contentHeight : Ti.UI.SIZE,
		contentWidth : Ti.UI.FILL,
		left : (options.defaultIsout) ? -options.itemLongWidth : 0,
		backgroundColor : '#eee',
		width : (true) ? options.itemLongWidth : options.itemShortWidth
	});
	args.items.forEach(function(item, ndx) {
		item.titleView.touchEnabled = false;
		var row = Ti.UI.createView({
			top : 0,
			itemId : ndx,
			backgroundColor : (ndx == self.activeItem) ? options.activeBackgroundColor : undefined,
			height : options.navBarItemHeight,
			//layout : 'horizontal'
		});
		row.add(item.titleView);
		row.add(Ti.UI.createView({
			right : 0,
			width : options.activeMarkerWidth,
			backgroundColor : options.activeMarkerColor,
			height : Ti.UI.FILL,
		}));
		self.navBar.add(row);
	});
	self.add(self.navBar);
	self.iconBar = Ti.UI.createScrollView({
		left : (!options.defaultIsout) ? -options.itemShortWidth : 0,
		scrollType : 'vertical',
		contentHeight : Ti.UI.SIZE,
		contentWidth : Ti.UI.FILL,
		backgroundColor : 'silver',
		layout : 'vertical',
		inputType : 'toggle',
		width : options.itemShortWidth
	});
	/* ading of all Icons  */
	args.items.forEach(function(item, ndx) {
		var row = Ti.UI.createView({
			top : 0,
			itemId : ndx,
			height : options.iconItemHeight
		});
		item.iconView.touchEnabled = false;
		row.add(item.iconView);
		row.add(Ti.UI.createView({
			right : 0,
			width : options.activeMarkerWidth,
			backgroundColor : options.activeMarkerColor,
			height : Ti.UI.FILL,
		}));
		
		self.iconBar.add(row);
	});
	self.add(self.iconBar);
	/* active navi element will be marked*/
	self.emphaseItem = function() {
		/* resetting */
		self.navBar.children.forEach(function(item) {
			item.backgroundColor = undefined;
			item.children[1].hide();
		});
		self.iconBar.children.forEach(function(item) {
			item.backgroundColor = undefined;
			item.children[1].hide();
		});
		self.navBar.children[self.activeItem].backgroundColor = options.activeBackgroundColor;
		self.navBar.children[self.activeItem].children[1].show();
		self.iconBar.children[self.activeItem].backgroundColor = options.activeBackgroundColor;
		self.iconBar.children[self.activeItem].children[1].show();

	};
	self.slideOut = function() {
		if (true == self.isOut) {
			self.iconBar.animate({
				left : -options.itemShortWidth,
				duration : 400
			});
			self.navBar.animate({
				left : 0
			}, function() {
				self.isOut = false;
			});
			if (CURRENT_ORIENTATION == Ti.UI.PORTRAIT)
				self.darker.show();
		}
	};
	self.slideIn = function() {
		if (false == self.isOut) {
			self.navBar.animate({
				left : -options.itemLongWidth,
				duration : 401
			});
			self.iconBar.animate({
				left : 0
			}, function() {
				self.isOut = true;
			});
			self.darker.hide();
		}
	};
	self.toggleNavi = function() {
		if (CURRENT_ORIENTATION == Ti.UI.PORTRAIT) {
			if (self.isOut) {
				self.slideOut();
			} else {
				self.slideIn();
			}
		}
	};
	self.onNaviClickhandler = function(_e) {
		if (_e.source.itemId === undefined) {
			self.toggleNavi();
		} else {
			if (!self.isOut) {
				self.toggleNavi();
			}
			if (self.rightContainer.itemId != _e.source.itemId) {
				self.activeItem = _e.source.itemId;
				self.emphaseItem();
				self.rightContainer.removeAllChildren();
				var item = args.items[_e.source.itemId];
				self.rightContainer.add(item.contentView);
				self.rightContainer.itemId = _e.source.itemId;
			}
		}
	};
	self.darker.addEventListener('click', self.onNaviClickhandler);
	self.navBar.addEventListener('click', self.onNaviClickhandler);
	self.iconBar.addEventListener('click', self.onNaviClickhandler);
	Ti.Gesture.addEventListener('orientationchange', setOrientationLayout);
	setOrientationLayout();
	self.emphaseItem();
	return self;
};

module.exports = function(args) {
	return new Widget(args);
};
