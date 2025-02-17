var Konto = function(e) {
	e.icon = e.icon || Ti.UI.createLabel({
		text : "N"
	}), e.fullicon = e.fullicon || Ti.UI.createLabel({
		text : "N"
	}), e.konto = e.konto || {
		amount : 0,
		name : "KEINS",
		description : "leer"
	}, e.content = e.content || Ti.UI.createView({
		backgroundColor : "#000"
	});
	var t = Ti.UI.createView({
		height : Ti.UI.SIZE,
		left : 10,
		top : 0,
		layout : "vertical"
	}),
	    i = Ti.UI.createLabel({
		text : e.konto.amount + " €",
		height : Ti.UI.SIZE,
		right : 10,
		touchEnabled : !1,
		color : e.konto.amount > 0 ? "#090" : "#c00",
		textAlign : "right",
		width : Ti.UI.FILL,
		font : {
			fontWeight : "normal",
			fontFamily : "monospace"
		}
	}),
	    o = Ti.UI.createLabel({
		text : e.konto.name,
		textAlign : "left",
		height : Ti.UI.SIZE,
		touchEnabled : !1,
		font : {
			fontWeight : "bold",
			fontSize : 20
		},
		top : 10,
		width : Ti.UI.FILL
	}),
	    n = Ti.UI.createLabel({
		text : e.konto.description,
		textAlign : "left",
		touchEnabled : !1,
		width : Ti.UI.FILL
	});
	return t.add(e.fullicon), t.add(o), t.add(n), t.add(i), {
		iconView : e.icon,
		titleView : t,
		contentView : e.content
	}
},
    kontoDataArray = [];
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
})), kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "K"
	}),
	konto : {
		amount : -200,
		name : "Kreditkarte1",
		description : "Dies ist eine Kreditkarte"
	},
	content : Ti.UI.createView({
		backgroundColor : "#F00"
	})
})), kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "S"
	}),
	konto : {
		amount : 2e4,
		name : "Sparkonto",
		description : "Dies ist ein Sparkonto"
	},
	content : Ti.UI.createView({
		backgroundColor : "#FF0"
	})
})), kontoDataArray.push(new Konto({
	icon : Ti.UI.createLabel({
		text : "K"
	}),
	konto : {
		amount : -2e4,
		name : "Kreditkarte2",
		description : "Dies ist eine Kreditkarte"
	},
	content : Ti.UI.createView({
		backgroundColor : "#00F"
	})
})), module.exports =
kontoDataArray; 