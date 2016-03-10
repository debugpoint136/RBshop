/*========== heatmap ===========*/

drawHeatMap = function(svg, params) {
	var cellSize = params.cellSize;
	var hccol = params.hccol;
	var hcrow = params.hcrow;
	var data = params.data;
	var colorScale = params.colorScale;
	var datasetNames = params.datasetNames;

    var heatMap;
    heatMap = svg.append("g").attr("class", "g3")
        .selectAll(".cellg")
        .data(data, function (d) {
            return d.row + ":" + d.col;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return hccol.indexOf(d.col) * cellSize;
        })
        .attr("y", function (d) {
            return hcrow.indexOf(d.row) * cellSize;
        })
        .attr("class", function (d) {
            return "cell cell-border cr" + (d.row - 1) + " cc" + (d.col - 1);
        })
        .attr("width", cellSize)
        .attr("height", cellSize)
        .style("fill", function (d) {
            return colorScale(d.value);
        })
        .on("click", function (d) {
            var rowtext = d3.select(".r" + (d.row - 1));

            // called function here that will create a genome graph view
            var coordinate = [];

            coordinate.push(datasetNames[d.row -1], colLabel[d.col - 1]);
            callGenomeGraph(coordinate);

            if (rowtext.classed("text-selected") == false) {
                rowtext.classed("text-selected", true);
            } else {
                rowtext.classed("text-selected", false);
            }
        })
        .on("mouseover", function (d) {
            //highlight text
            d3.select(this).classed("cell-hover", true);
            d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) {
                return ri == (d.row - 1);
            });
            d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) {
                return ci == (d.col - 1);
            });
            /*========== Tooltip ===========*/

            //Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px")
                .select("#experiment")
                //.text("labels:" + rowLabel[d.row - 1] + "," + colLabel[d.col - 1] + "\ndata:" + d.value + "\nrow-col-idx:" + d.col + "," + d.row + "\ncell-xy " + this.x.baseVal.value + ", " + this.y.baseVal.value);
                .text("Experiment:" + rowLabel[d.row - 1]);
            d3.select("#tooltip")
                .select("#repeat-subfamily")
                .text("Repeat Subfamily : " + colLabel[d.col - 1]);
            //"\ndata:" + d.value + "\nrow-col-idx:" + d.col + "," + d.row + "\ncell-xy " + this.x.baseVal.value + ", " + this.y.baseVal.value);
            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function () {
            d3.select(this).classed("cell-hover", false);
            d3.selectAll(".rowLabel").classed("text-highlight", false);
            d3.selectAll(".colLabel").classed("text-highlight", false);
            d3.select("#tooltip").classed("hidden", true);
        });

   	legend(svg, params);
};