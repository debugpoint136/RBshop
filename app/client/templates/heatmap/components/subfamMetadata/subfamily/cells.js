cells = function(svg, params) {

    var colMetaData = svg.append("g")
        .selectAll(".colMetadatag")
        .data(params.colLabel)
        .enter()
        .append("rect")
        .attr("class", "sfsf")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return params.hccol.indexOf(i + 1) * params.cellSize;
        })
        .style("text-anchor", "left")
        .attr("transform", "translate(0, -80) rotate (-90)")
        .attr("width", params.cellSize)
        .attr("height", params.cellSize)
        .style("fill", function (d) {
            return params.CFScolors[d][4];
        })
        .on("click", function (d, i) {
            colSortOrder = !colSortOrder;
            sortbylabel("c", i, colSortOrder);
            d3.select("#order").property("selectedIndex", 4).node().focus();
        }) // move this to On click - Subfamily
      ;

      labels( svg, params );
}