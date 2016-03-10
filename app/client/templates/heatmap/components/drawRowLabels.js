   /*========== Row labels ===========*/

drawRowLabels = function(svg, param, next) {
       /*========== Row labels ===========*/

            var rowLabels = svg.append("g")
                .selectAll(".rowLabelg")
                .data(param.rowLabel)
                .enter()
                .append("text")
                .text(function (d) {
                    return d;
                })
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return param.hcrow.indexOf(i + 1) * param.cellSize;  // relative position of the row
                })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + param.cellSize / 1.25 + ")")
                .attr("class", function (d, i) {
                    return "rowLabel mono r" + i;
                })
                .on("mouseover", function (d) {
                    d3.select(this).classed("text-hover", true);
                })
                .on("mouseout", function (d) {
                    d3.select(this).classed("text-hover", false);
                })
                // .on("click", function (d, i) {
                //     rowSortOrder = !rowSortOrder;
                //     sortbylabel("r", i, rowSortOrder);
                //     d3.select("#order").property("selectedIndex", 3).node().focus();  // this selects the order drop-down to "by contrast name"
                //     ;
                // })
                ;
    drawColLabels(svg, param);
};
            