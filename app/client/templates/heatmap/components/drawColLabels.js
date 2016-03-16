drawColLabels = function(svg, params) {
     var colLabels = svg.append("g")
        .selectAll(".colLabelg")
        .data(params.colLabel)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
            return params.hccol.indexOf(i + 1) * params.cellSize;
        })
        .style("text-anchor", "left")
        .attr("transform", "translate(" + params.cellSize / 1.25 + ",-6) rotate (-90)")
        .attr("class", function (d, i) {
            return "colLabel mono c" + i;
        })
        .on("mouseover", function (d) {
            d3.select(this).classed("text-hover", true);
        })
        .on("mouseout", function (d) {
            d3.select(this).classed("text-hover", false);
        })
        // .on("click", function (d, i) {
        //     colSortOrder = !colSortOrder;
        //     sortbylabel("c", i, colSortOrder);
        //     d3.select("#order").property("selectedIndex", 4).node().focus();
        // })
        ;
    subFamMetaDataCells(svg, params);
}; /* end */
        
