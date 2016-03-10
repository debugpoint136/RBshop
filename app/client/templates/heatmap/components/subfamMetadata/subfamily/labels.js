// SUBFAMILY METADATA LABEL

labels = function(svg, params ) {

	var subFamilyMetadataLabel = svg.append("g")
	    .append("text")
	    .text('Subfamily')
	    .attr("x", 0)
	    .attr("y", 0)
	    .attr("transform", "translate(-6, -80)")
	    .attr("class", "subMetadataLabelg")

	    // TODO: this selects the order drop-down to "by contrast name"
	    .on("click", function () {
	        console.log("subfamily clicked..!");
	        order("contrast");
	    });
};