exports.template = {
	id:"2015/12",
	qrcode : true,
	billaddress : {
		company : 'Acme',
		city : 'Hamburg',
		zip : '22303',
		extra : 'c/o Herrn Schneider'
	},
	billinglocation: "Hamburg",
	pretext : "Wir möchten folgende Leistungen abrechnen:",
	posttext :"Bitte überweisen Sie den ausgezeichenten Betrag ungeteilt bis zum Sanktnimmerleinstag auf unser Konto",
	vat : 0.19,
	currency : "€",
	jobs : [{
		unit : "Stunden",
		text : "Beratung",
		units: 2,
		amount : 85,
	},{
		unit : "Stunden",
		text : "Daumendrücken",
		units: 5,
		amount : 85,
	}
	]
};
