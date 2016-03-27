   /*========== Row labels ===========*/

drawRowLabels = function(props) {
       /*========== Row labels ===========*/

            var svg = d3.select(".heatmapgrid");
            
            var rowLabels = svg.append("g")
                .selectAll(".rowLabelg")
                .data(props.rowLabel)
                .enter()
                .append("text")
                .text(function (d) {
                    // var arr = d.split(" ");
                    // return arr[0].concat(' - ' + arr[1]);

                    return d;
                })
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return props.hcrow.indexOf(i + 1) * props.cellSize;  // relative position of the row
                })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + props.cellSize / 1.25 + ")")
                .attr("class", function (d, i) {
                    return "rowLabel mono r" + i;
                })
                .on("mouseover", function (d) {
                    d3.select(this).classed("text-hover", true);
                })
                .on("mouseout", function (d) {
                    d3.select(this).classed("text-hover", false);
                })
                .on("click", function (d, i) {
                    var rowSortOrder = false;
                    rowSortOrder = !rowSortOrder;
                    sortbylabel("r", i, rowSortOrder, props);
                    // d3.select("#order").property("selectedIndex", 3).node().focus();  // this selects the order drop-down to "by contrast name"
                    ;
                })
                ;
};
            