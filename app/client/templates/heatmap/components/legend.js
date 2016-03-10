/*========== Legend ===========*/

legend = function(svg, params) {
	var cellSize = params.cellSize;
	var width = params.width;
	var height = params.height;
	var data = params.data;
	var colorScale = params.colorScale;
	var colorScale = params.colorScale;
	var colors = params.colors;

    var legend = svg.selectAll(".legend")
        .data([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function (d, i) {
            return legendElementWidth * i;
        })
        .attr("y", height + (cellSize * 2))
        .attr("width", legendElementWidth)
        .attr("height", cellSize)
        .style("fill", function (d, i) {
            return colors[i];
        });

    legend.append("text")
        .attr("class", "mono")
        .text(function (d) {
            return d;
        })
        .attr("width", legendElementWidth)
        .attr("x", function (d, i) {
            return legendElementWidth * i;
        })
        .attr("y", height + (cellSize * 4));
};