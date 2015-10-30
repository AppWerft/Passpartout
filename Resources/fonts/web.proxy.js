module.exports = function() {
	/* aufrufparameter ist JSON string*/
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'index.html');
	file.write(JSON.parse(arguments[0]).content);
	/* Return wert ist Zeiger auf Datei im FS */
	return file.nativePath;
};
