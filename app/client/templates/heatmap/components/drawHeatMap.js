/*========== heatmap ===========*/

drawHeatMap = function(svg, params) {
	var cellSize = params.cellSize;
	var hccol = params.hccol;
	var hcrow = params.hcrow;
	var data = params.data;
	var posColorScale = params.posColorScale;
    var negColorScale = params.negColorScale;
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
            /*if ( d.value < 0 ) {
                return negColorScale(parseInt(d.value));
            } else {
                return posColorScale(parseInt(d.value));
            }*/
            return colorScale(parseInt(d.value));            
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
            var tooltip = d3.select("#tooltip");
            tooltip
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px");
            tooltip
                .select("#experiment")
                .text(rowLabel[d.row - 1]);
            tooltip
                .select("#repeat-subfamily")
                .text(colLabel[d.col - 1]);
            //Show the tooltip
            tooltip
                .select("#score")
                .text("Log odds ratio : " + d.value.toFixed(2));
            tooltip
                .classed("hidden", false);
        })
        .on("mouseout", function () { 
            d3.select(this).classed("cell-hover", false);
            d3.selectAll(".rowLabel").classed("text-highlight", false);
            d3.selectAll(".colLabel").classed("text-highlight", false);
            d3.select("#tooltip").classed("hidden", true);
        });

   	legend(svg, params);
};