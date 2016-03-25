/* set variables for grid */
grid_init = function() {

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
        .append('text')
        .text('Select something ...')
        ;

    svg = d3.selectAll("#selectiondatagrid").append("svg");
    svg.append("circle")
        .attr("cx",40)
        .attr("cy",40)
        .attr("r",20)
        .style("fill","blue");

    dataObserver();

}