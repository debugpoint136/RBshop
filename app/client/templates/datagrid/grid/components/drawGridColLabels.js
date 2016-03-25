drawGridColLabels = function(props) {

     var svg = d3.select("#selectiondatagrid svg .grid");
     var colLabels = svg.append("g")
        .selectAll(".colLabelg")
        .data(props.colLabel, function(d) { return d; })
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * props.cellSize;
        })
        .style("text-anchor", "left")
        .attr("transform", "translate(" + props.cellSize / 1.25 + ",-6) rotate (-90)")
        .attr("class", function (d, i) {
            return "colLabel mono c" + i;
        });
}