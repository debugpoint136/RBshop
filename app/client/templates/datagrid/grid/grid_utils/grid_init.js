/* set variables for grid */
grid_init = function(data) {

	// data : receive from onRendered
	
	var testdata = {
		'a1': [0,0,2,0,3],
		'a2': [3,0,1,0,1],
		'a3': [0,3,0,2,0],
		'a4': [1,0,0,2,0],
		'a5': [0,0,2,0,1]
	};

	var formattedData = [];
	var assayLabels = [];

	Object.keys(testdata).forEach(function(assay, i) {
		assayLabels.push(assay);
		testdata[assay].forEach(function(sval, j) {
			var cellObj = {}; // tmp obj
            cellObj['row'] = j;
            cellObj['col'] = i;
            cellObj['val'] = sval;
            formattedData.push(cellObj);
		});
	});

	var props = {
		margin : {top: 150, right: 10, bottom: 50, left: 300},
		cellSize : 12,
		cols : 5, //
    	rows : 5, //
    	width : 60, //
    	height : 60 //
	};

	var cellSize = 12;
	var svg = d3.select("#selectiondatagrid").append("svg")
        .attr("width", props.width + props.margin.left + props.margin.right)  
        .attr("height", props.height + props.margin.top + props.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        ;

    var gridmat = svg.append("g").attr("class", "grid").selectAll(".cellg")
        .data(formattedData)
        .enter()
        .append('rect')
        .attr("x", function (d, i) {
            return d.col * cellSize;
        })
        .attr("y", function (d, i) {
            return  d.row * cellSize;
        })
        .attr("class", function (d, i) {
            return "cell cell-border cr" + i + " cc" + i ;
        })
        .attr("width", cellSize)
        .attr("height", cellSize)
        .style("fill", function (d) {
        	if (d.val) {
        		return 'red';
        	} else {
        		return '#dfdfdf';
        	}
        })
        ;
    props.colLabel = assayLabels;
    props.svg = svg;
    props.data = formattedData;
    drawGridColLabels(props);
}