drawColLabels = function(props) {

    var svg = d3.select(".heatmapgrid");
    
    var colLabels = svg.append("g")
        .selectAll(".colLabelg")
        .data(props.colLabel)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
            return props.hccol.indexOf(i + 1) * props.cellSize;
        })
        .style("text-anchor", "left")
        .attr("transform", "translate(" + props.cellSize / 1.25 + ",-6) rotate (-90)")
        .attr("class", function (d, i) {
            return "colLabel mono c" + i;
        })
        .on("mouseover", function (d) {
            d3.select(this).classed("text-hover", true);
        })
        .on("mouseout", function (d) {
            d3.select(this).classed("text-hover", false);
        })
        .on("click", function (d, i) {
            var colSortOrder = false;
            colSortOrder = !colSortOrder;
            sortbylabel("c", i, colSortOrder, props);
            // d3.select("#order").property("selectedIndex", 4).node().focus();
        })
        ;
}; /* end */
        
