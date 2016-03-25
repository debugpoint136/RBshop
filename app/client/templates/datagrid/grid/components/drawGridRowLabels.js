drawGridRowLabels = function(props) {

		var svg = d3.select("#selectiondatagrid svg .grid");
	
	    var rowLabels = svg.append("g")
                .selectAll(".rowLabelg")
                .data(props.rowLabel)
                .enter()
                .append("text")
                .text(function (d) {
                    return d;
                })
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return i * props.cellSize;  
                })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + props.cellSize / 1.25 + ")")
                .attr("class", function (d, i) {
                    return "rowLabel mono r" + i;
                })
}