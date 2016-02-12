const PADDING = {
	LEFT : 25,
	RIGHT : 25
};

exports.add = function(PDF, MODEL, UI, ypos) {
	/* first we collect all rows which shows data */
	var headers = MODEL.content.services.headers;
	var rows = MODEL.content.services.rows;
	//TODO validation of array of array
	var tableoptions = {
		headers : headers,
		data :rows,
		options : {
			theme : 'plain',
			margin : {
				top : ypos + 10,
				left : PADDING.LEFT,
				right : PADDING.RIGHT
			},
			styles : {
				valign : 'top',
				overflow : 'linebreak',
				columnWidth : 'auto',
				cellPadding : 5,
				rowHeight : 0
			}
		}
	};
	/* hooks for cell rendering */
	tableoptions.options.createdCell = function(cell, data) {
		if (data.column.dataKey > 1)
			cell.styles.halign = 'right';
	};
	tableoptions.options.createdHeaderCell = function(cell, data) {
		if (data.column.dataKey > 1)
			cell.styles.halign = 'right';
		else
			cell.styles.halign = 'left';
	};
	PDF.autoTable(tableoptions.headers,tableoptions.data, tableoptions.options );
	return PDF.autoTableEndPosY();
}; 