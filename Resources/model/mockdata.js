var Konto = function(konto) {
	konto.icon = konto.icon || Ti.UI.createLabel({
		text : "N"
	});
	konto.fullicon = konto.fullicon || Ti.UI.createLabel({
		text : "N"
	});
	konto.konto = konto.konto || {
		amount : 0,
		name : "KEINS",
		description : "leer"
	};
	konto.content = konto.content || Ti.UI.createView({
		backgroundColor : "#000",

	});

	var titleView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		left : 10,
		top : 0,
		layout : 'vertical',
	});
	var labelAmount = Ti.UI.createLabel({
		text : konto.konto.amount + ' €',
		height : Ti.UI.SIZE,
		right : 10,
		touchEnabled:false,
		color : konto.konto.amount > 0 ? '#090' : '#c00',
		textAlign : 'right',
		width : Ti.UI.FILL,
		font : {
			fontWeight : 'normal',
			fontFamily : 'monospace'
		}
	});
	var labelName = Ti.UI.createLabel({
		text : konto.konto.name,
		textAlign : 'left',
		height : Ti.UI.SIZE,
		touchEnabled:false,
		font : {
			fontWeight : 'bold',
			fontSize : 20
		},
		top : 10,
		width : Ti.UI.FILL

	});
	var labelDesc = Ti.UI.createLabel({
		text : konto.konto.description,
		textAlign : 'left',touchEnabled:false,
		width : Ti.UI.FILL
	});
	titleView.add(konto.fullicon);
	titleView.add(labelName);
	titleView.add(labelDesc);
	titleView.add(labelAmount);
	return {
		iconView : konto.icon,
		titleView : titleView,
		contentView : konto.content
	};
};

var kontoDataArray = [];

kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "G"
	}),
	konto : {
		amount : 215.34,
		name : "Giro Plus",
		description : "Dies ist ein Girokonto"
	},
	content : Ti.UI.createView({
		backgroundColor : "#F0F"
	})
}));
kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "K"
	}),
	konto : {
		amount : -200.00,
		name : "Kreditkarte1",
		description : "Dies ist eine Kreditkarte"
	},
	content : Ti.UI.createView({
		backgroundColor : "#F00"
	})
}));
kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "S"
	}),
	konto : {
		amount : 20000.00,
		name : "Sparkonto",
		description : "Dies ist ein Sparkonto"
	},
	content : Ti.UI.createView({
		backgroundColor : "#FF0"
	})
}));
kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "K"
	}),
	konto : {
		amount : -20000,
		name : "Kreditkarte2",
		description : "Dies ist eine Kreditkarte"
	},
	content : Ti.UI.createView({
		backgroundColor : "#00F"
	})
}));

module.exports = kontoDataArray;
