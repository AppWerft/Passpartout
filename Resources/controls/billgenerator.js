var Moment=require("vendor/moment");
Number.prototype.toPt= function() {
return 72*this/2.504;
};
var testTable= function(e) {
var t=new (require("ti.jspdf"))("p","mm");
t.addAutoTable(e);
var a=t.autoTableEndPosY()-e.options.margin.top;
return t=null,a;
};
module.exports= function(e) {
var t=(new Date).getTime(), a=new (require("ti.jspdf"))("p","mm");
a.internal.pageSize.height
const o= {
LEFT:25,RIGHT:25,BOTTOM:10
};
console.log(a.internal.pageSize.width-o.RIGHT),a.addImage(Ti.Filesystem.resourcesDirectory+"/assets/logo.jpg","JPEG",a.internal.pageSize.width-90,5,80,20),a.addText= function(e,t) {
var o=t[0]>=0?parseFloat(t[0]):a.internal.pageSize.width+t[0], i=t[1]>=0?t[1]:a.internal.pageSize.height+t[1];
return a.text(e,o,i)
},a.addTextBox= function(e,t,o,i) {
return a.addAutoTable({
headers:[""],data:[[e]],options: {
drawHeaderRow: function() {
return !1
},theme:"plain",margin: {
top:o,left:t,right:a.internal.pageSize.width-t-i
},styles: {
valign:"top",overflow:"linebreak",columnWidth:"auto",cellPadding:0,rowHeight:0
}
}
})
};
var i= {};
try {
i=JSON.parse(e)
} catch(n) {
return console.log(n),alert("This configuration is not valid JSON"),null
}
var r=Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,"model",i.model.type+"_template.json");
if(!r.exists())
	return alert("No template for "+i.model.type+"found"),null;
var l=JSON.parse(r.read().getText()), s=i.model.metadata, d=i.model.printdata;
switch(a.setProperties(s),i.model.type) {
case"offer":
const T=10.5;
a.setFont(l.FONTFAMILY),a.setDrawColor(0),a.setFontType("normal"),a.setFontSize(7),a.addText(d.absender,l.ABSENDER),a.setFontSize(T),a.addText(d.kunde,l.KUNDE),a.addText(d.emailabsender,l.EMAILABSENDER),a.addText("Angebotsdatum:",l.ANGEBOT_DATUM.LABEL),a.addText(Moment().add(d.angebot_datum,"day").format("DD. MM. YYYY"),l.ANGEBOT_DATUM.TEXT),a.addText("Gültig bis:",l.ANGEBOT_BIS.LABEL),a.addText(Moment().add(d.angebot_bis,"day").format("DD. MM. YYYY"),l.ANGEBOT_BIS.TEXT),a.addText("Ansprechpartner:",l.ANGEBOT_KONTAKT.LABEL),a.addText(d.angebot_kontakt,l.ANGEBOT_KONTAKT.TEXT),a.addText("Telefon:",l.ANGEBOT_TELEFON.LABEL),a.addText(d.angebot_telefon,l.ANGEBOT_TELEFON.TEXT),a.addText("E-Mail:",l.ANGEBOT_EMAIL.LABEL),a.addText(d.angebot_email||"",l.ANGEBOT_EMAIL.TEXT),a.setFontType("bold"),a.setFontSize(18),a.addText(d.titel||"Angebot",l.TITEL),a.setFontSize(T),a.setFontType("normal");
const E=5;
var u=(a.internal.pageSize.width-o.LEFT-o.RIGHT)/E;
a.setFontSize(7),a.setFontType("normal"),l.FUSS.forEach(function(e,t) {
var i=t%E;
row=Math.floor(t/E),a.addText(e,[o.LEFT+i*u,-row*E-5])
}),a.setFontSize(T),a.setFontType("normal"),a.addTextBox(d.vortext,Math.abs(l.NACHTEXT[0]),Math.abs(l.VORTEXT[1])+10,a.internal.pageSize.width-Math.abs(l.NACHTEXT[0])-o.RIGHT);
var m=a.autoTableEndPosY(), c=a.internal.pageSize.height-m-Math.abs(l.NACHTEXT[1]);
console.log("availableHeight: "+c);
var p=[];
d.services.forEach(function(e) {
var t=[];
t.push(e.unit),t.push(e.text),t.push(e.units),t.push(e.amount+"  €"),t.push(e.amount*e.units+"  €"),p.push(t)
});
var g= {
headers:["Einheit","Leistung","Anzahl","Betrag","Summe"],data:p,options: {
theme:"plain",margin: {
top:m+10,left:o.LEFT,right:o.RIGHT
},styles: {
valign:"top",overflow:"linebreak",columnWidth:"auto",cellPadding:0,rowHeight:0
}
}
};
g.options.createdCell= function(e,t) {
t.column.dataKey>1&&(e.styles.halign="right")
},g.options.createdHeaderCell= function(e,t) {
e.styles.halign=t.column.dataKey>1?"right":"left"
};
var h=testTable(g);
h>c&&a.addPage(),a.addAutoTable(g),a.addText(d.nachtext||"",l.NACHTEXT),a.addText(d.gruss||"",l.GRUSS)
}
var S="Rechnung_GK_"+Ti.App.Properties.getInt("nr",0), f=Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(),S+".pdf");
return a.save(f),console.log("Info: time for PDF creation: "+((new Date).getTime()-t)),f
};