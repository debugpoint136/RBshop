subFamMetaDataCells = function(svg, params) {
 /*========== CFS Metadata labels ===========*/
            
    // SUBFAMILY METADATA CELLS

    /* Declare variables */
    var dispClasses = [],
        dispFamilies = [],
        dispSubFamilies = [];

    d3.json("/CFScolors.json", function(CFScolors) {

        params['CFScolors'] = CFScolors;

        cells( svg, params );

        

        // FAMILY METADATA CELLS

        var familyMetaData = svg.append("g")
            .selectAll(".familyMetadatag")
            .data(colLabel)
            .enter()
            .append("rect")
            .attr("class", "sff")
            .attr("x", 0)
            .attr("y", function (d, i) {
                return params.hccol.indexOf(i + 1) * params.cellSize;
            })
            .style("text-anchor", "left")
            .attr("transform", "translate(0, -92) rotate (-90)")
            .attr("width", params.cellSize)
            .attr("height", params.cellSize)
            .style("fill", function (d) {
                return CFScolors[d][3];
            })
            .on("click", function (d, i) {
                colSortOrder = !colSortOrder;
                sortbylabel("c", i, colSortOrder);
                d3.select("#order").property("selectedIndex", 4).node().focus();
            }) // move this to On click - Subfamily
          ;

        // FAMILY METADATA LABEL 

        var familyMetadataLabel = svg.append("g")
            .append("text")
            .text('Family')
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", "translate(-6, -93)")
            .attr("class", "subMetadataLabelg")

            // TODO: this selects the order drop-down to "by contrast name"
            .on("click", function () {
                console.log("Family clicked..!");
                order("contrast");
            });

        // CLASS METADATA CELLS

        var classColors = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"];

        var classMetaData = svg.append("g")
            .selectAll(".classMetadatag")
            .data(colLabel)
            .enter()
            .append("rect")
            .attr("class", "sfc")
            .attr("x", 0)
            .attr("y", function (d, i) {
                return params.hccol.indexOf(i + 1) * params.cellSize;
            })
            .style("text-anchor", "left")
            .attr("transform", "translate(0, -104) rotate (-90)")
            .attr("width", params.cellSize)
            .attr("height", params.cellSize)
            .style("fill", function (d) {
                dispClasses.push(CFScolors[d][1]);
                return CFScolors[d][2];
            })
            ;
            
        // CLASS METADATA LABEL 

        var classMetadataLabel = svg.append("g")
            .append("text")
            .text('Class')
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", "translate(-6, -106)")
            .attr("class", "subMetadataLabelg")

            // TODO: this selects the order drop-down to "by contrast name"
            .on("click", function () {
                colSortOrder = !colSortOrder;
                sortbylabel("sfClass", dispClasses, colSortOrder);
            });
    }); // end of d3.json call

    assaySampleMetadata(svg, params);
};