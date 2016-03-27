assaySampleMetadata = function(props) {
	var sampleColors = {};
            var assayColors = {};  
            var colSortOrder = false;
            var rowSortOrder = false;                                             // this is an adhoc objects to hold colors for samples and assays

            var dispSamples = [];
            var dispAssays = [];

            var svg = d3.select(".heatmapgrid");

            var mdmOfsset = {
                'sample': { 'label': -266 , 'cells': -278},
                'assay' : { 'label': -278, 'cells': -290 }
            };

            /*========== TCA Metadata start ===========*/

//################## SAMPLE METADATA MAP 
                    var sampleMetaData = svg.append("g")
                            .selectAll(".sampleMetadatag")
                            .data(props.datasetNames)
                            .enter()
                            .append("rect")
                            .attr("class", "ysam")
                            .attr("x", 0)
                            .attr("y", function (d, i) {
                                return props.hcrow.indexOf(i) * props.cellSize;
                            })
                            .attr("transform", "translate( " + mdmOfsset.sample.cells + ", " + props.cellSize + ")")
                            .attr("width", props.cellSize)
                            .attr("height", props.cellSize)
                            .style("fill", function (d) {
                                var sample = GEOglobal[[d][0]].sample;
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
                            .data(props.datasetNames)
                            .enter()
                            .append("rect")
                            .attr('class', 'yAssay')
                            .attr("x", 0)
                            .attr("y", function (d, i) {
                                return props.hcrow.indexOf(i) * props.cellSize;
                            })
                            .attr("transform", "translate( " + mdmOfsset.assay.cells + ", " + props.cellSize + ")")
                            .attr("width", props.cellSize)
                            .attr("height", props.cellSize)
                            .style("fill", function (d) {
                                var assay = GEOglobal[[d][0]].assay;
                                dispAssays.push(assay);

                                if (assayColors[assay]) {
                                    return assayColors[assay];
                                } else {
                                    var newColor = getNewColor(); // randomly picking some color | TODO: refactor this to have fixed colors?
                                    assayColors[assay] = newColor;
                                    return newColor;
                                }
                            }); // style end


//################## SAMPLE METADATA LABEL 
            var sampleMetadataLabel = svg.append("g")
                .data(props.datasetNames)
                .append("text")
                .text('Sample')
                .attr("x", 0)
                .attr("y", 0)
                .attr("transform", "translate( " + mdmOfsset.sample.label + ", -6) rotate (-90)")
                .attr("class", "tcaMetadataLabelg")
                .on("click", function () {
                    colSortOrder = !colSortOrder;
                    sortbylabel("ySample", dispSamples, colSortOrder, props);
                });

//################## ASSAY METADATA LABEL 
            var assayMetadataLabel = svg.append("g")
                .append("text")
                .text('Assay')
                .attr("x", 0)
                .attr("y", 0)
                .attr("transform", "translate( " + mdmOfsset.assay.label + ", -6) rotate (-90)")
                .attr("class", "tcaMetadataLabelg")
                .on("click", function () {
                    colSortOrder = !colSortOrder;
                    sortbylabel("yAssay", dispAssays, colSortOrder, props);
                });

            /*========== TCA Metadata end ===========*/
};