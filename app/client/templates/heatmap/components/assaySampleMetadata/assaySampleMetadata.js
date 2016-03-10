assaySampleMetadata = function(svg, params) {
	var sampleColors = {};
            var assayColors = {};                                               // this is an adhoc objects to hold colors for samples and assays

            var geoURL = 'http://vizhub.wustl.edu/public/hg19/encode.md',
                roadmapURL = 'http://vizhub.wustl.edu/public/hg19/roadmap9_methylC.md';
          
            var geoFlat = {};
            var dispSamples = [];
            var dispAssays = [];

            /*========== TCA Metadata start ===========*/

            d3.json(geoURL,                                                     // TODO: hardcoded for encode only
                function(err, res) {
                    cleanUpGEO(res, geoFlat);

//################## SAMPLE METADATA MAP 
                    var sampleMetaData = svg.append("g")
                            .selectAll(".sampleMetadatag")
                            .data(params.datasetNames)
                            .enter()
                            .append("rect")
                            .attr("class", "ysam")
                            .attr("x", 0)
                            .attr("y", function (d, i) {
                                return params.hcrow.indexOf(i) * params.cellSize;
                            })
                            .attr("transform", "translate(-268, " + params.cellSize + ")")
                            .attr("width", params.cellSize)
                            .attr("height", params.cellSize)
                            .style("fill", function (d) {
                                var sample = geoFlat[d][0].metadata.Sample;
                                dispSamples.push(sample);

                                if (sampleColors[sample]) {
                                    return sampleColors[sample];
                                } else {
                                    var newColor = getNewColor(); // randomly picking some color | TODO: refactor this to have fixed colors?
                                    sampleColors[sample] = newColor;
                                    return newColor;
                                }
                            }); // style end

//################## ASSAY METADATA MAP 
                    var assayMetaData = svg.append("g")
                            .selectAll(".assayMetadatag")
                            .data(params.datasetNames)
                            .enter()
                            .append("rect")
                            .attr('class', 'yAssay')
                            .attr("x", 0)
                            .attr("y", function (d, i) {
                                return params.hcrow.indexOf(i) * params.cellSize;
                            })
                            .attr("transform", "translate(-280, " + params.cellSize + ")")
                            .attr("width", params.cellSize)
                            .attr("height", params.cellSize)
                            .style("fill", function (d) {
                                var assay = geoFlat[d][0].metadata.Assay;
                                dispAssays.push(assay);

                                if (assayColors[assay]) {
                                    return assayColors[assay];
                                } else {
                                    var newColor = getNewColor(); // randomly picking some color | TODO: refactor this to have fixed colors?
                                    assayColors[assay] = newColor;
                                    return newColor;
                                }
                            }); // style end
            }); // d3.json call end

//################## SAMPLE METADATA LABEL 
            var sampleMetadataLabel = svg.append("g")
                                .data(params.datasetNames)
                                .append("text")
                                .text('Sample')
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("transform", "translate(-256, -6) rotate (-90)")
                                .attr("class", "tcaMetadataLabelg")

                                // TODO: this selects the order drop-down to "by contrast name"
                                .on("click", function () {
                                    colSortOrder = !colSortOrder;
                                    sortbylabel("ySample", dispSamples, colSortOrder);
                                });

//################## ASSAY METADATA LABEL 
            var assayMetadataLabel = svg.append("g")
                                .append("text")
                                .text('Assay')
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("transform", "translate(-268, -6) rotate (-90)")
                                .attr("class", "tcaMetadataLabelg")

                                // TODO: this selects the order drop-down to "by contrast name"
                                .on("click", function () {
                                    colSortOrder = !colSortOrder;
                                    sortbylabel("yAssay", dispAssays, colSortOrder);
                                });

            /*========== TCA Metadata end ===========*/
   drawHeatMap(svg, params);
};