drawGrid = function(dfprops) {

	var colLabel = dfprops.colLabel;
	var rowLabel = dfprops.rowLabel;
	var arr2D = dfprops.data;

	var cols = colLabel.length,
		rows = arr2D.length / cols,
		cellSize = 12,
		width = cols * cellSize + 100,
		height = rows * cellSize + 100;

	var props = {
		margin : {top: 200, right: 10, bottom: 150, left: 300},
		cellSize : 12,
		cols : cols,
		rows : rows, 
    	width : width, 
    	height : height,
    	colLabel : colLabel,
    	rowLabel : rowLabel  
	};


	var svg = d3.select("#selectiondatagrid svg");
	svg.remove();
	var svg = d3.select("#selectiondatagrid").append("svg")
        .attr("width", props.width + props.margin.left + props.margin.right)  
        .attr("height", props.height + props.margin.top + props.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        ;


	var gridmat = svg.append("g").attr("class", "grid")
		.selectAll(".cellg")
        .data( arr2D, function (d) {
            return d.row + ":" + d.col;
        })
        .enter()
        .append('g')
        ;

    gridmat
        .append('rect')
        .attr("x", function (d, i) {
            return d.col * props.cellSize;
        })
        .attr("y", function (d, i) {
            return  d.row * props.cellSize;
        })
        .attr("class", function (d, i) {
        	if (d.val) {
        		return "hasData cell cell-border cr" + i + " cc" + i ;
        	} else {
        		return "cell cell-border cr" + i + " cc" + i ;
        	}
        })
        .attr('id', function(d) {
        	return d.datasets;
        })
        .attr("width", props.cellSize)
        .attr("height", props.cellSize)
        .style("fill", function (d) {
        	if (d.val) {
        		return randomColor();
        	} else {
        		return '#4B717F';
        	}
        });

    gridmat
        .append('text')
        .attr("x", function (d, i) {
            return d.col  * props.cellSize + 2;
        })
        .attr("y", function (d, i) {
            return  (d.row + 1)  * props.cellSize + 2;
        })
        .attr('id', function(d) {
        	return d.datasets;
        })
        .attr("dy", "-.35em")
    	//.attr("opacity", "0")	
        .text(function (d) {
        	if ( d.val > 0 )
            return d.val;
        })
        .attr('class', 'datasetNum')
        ;

     drawGridColLabels(props)
     drawGridRowLabels(props);
}

var safeColors = ['00','33','66','99','cc','ff'];
var rand = function() {
    return Math.floor(Math.random()*6);
};
var randomColor = function() {
    var r = safeColors[rand()];
    var g = safeColors[rand()];
    var b = safeColors[rand()];
    return "#"+r+g+b;
};