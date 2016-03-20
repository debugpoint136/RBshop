draw_genomebev_experiment = function()
{
    /* draw bev graph on which the TEs from a subfam is plotted
     colored by experiment assay data
    */
    var margin  =   GVprops.margin,
        width   =   GVprops.width,
        height  =   GVprops.height,
        chrLengths = GVprops.chrLengths,
        chrLen_scale = GVprops.chrLen_scale,
        colors  =   GVprops.colors,
        chrLst = GVprops.chrLst; 

    var svg = bev.genomebev_base;
    var s = Session.get('selectedbySlider');

    chrLst.forEach(function(chrNum, chrIndex) {
           svg
            .selectAll('rect')
            .data(d3.values(bev.data[chrNum]), function(d) { 
                return(d[4]); })
            .exit()
            .transition()
            .duration(1000)
            .remove()
            ;
    });

    var chrBars = svg.append("g")
        .selectAll(".chrbar")
        .data(d3.values(chrLengths))
        .enter()
        .append("rect")
        .attr("x", -5)
        .attr('fill', '#F5F5F5')
        .attr("y", function (d, i) {
            return i * 30;
        })
        .attr('rx', 5)
        .attr('ry', 5)
        .attr("class", function (d, i) {
            return " chr chr-border chr" + i;
        })
        .attr("width", function(d) {
            return chrLen_scale(d) + 10;
        })
        .attr("height", 17)
        ;

     var totalSelectedCount = 0;
     var tickWidth = 3;
        var negElements = d3.selectAll('.selectedNeg').size(),
            posElements = d3.selectAll('.selectedPos').size(),
            zeroElements = d3.selectAll('.selectedZero').size();
    
            totalSelectedCount = negElements + posElements + zeroElements;

            if ( totalSelectedCount > 1500 ) {
                tickWidth = 1;
                // $.blockUI({ message: null }); 
                // setTimeout($.unblockUI, totalSelectedCount * 4 );
            } 


    chrLst.forEach(function(chrNum, chrIndex) {
        var chrTicks = svg.append('g')
    		.selectAll('chrTicks')
    		.data(d3.values(bev.data[chrNum]), function(d) { return(d); })
    		.enter()
    		.append("rect")
            .filter(function(d) { return s[0] <= d[4] && d[4] <= s[1] })
            .transition()
            .duration(500)
            .ease('bounce')
	        .attr("x", function(d, i) {
	        	return  chrLen_scale( d[0] ) ;
	        })
	        .attr('fill', function(d, i) { 
                if ( d[4] < 0 ) {
                    return colors[0];
                } else if ( d[4] == 0 ){
                    return 'grey';
                } else {
                    return colors[1];
                }
                // return colorScale( d[4] );
	        })
	        .attr("y", function() {
	        	return chrIndex * 30 + 3;
	        })
	        .attr("class", function (d, i) {
	            return 'top chr' + i + 'Ticks';
	        })
	        .attr("width", tickWidth)
	        .attr("height", 11)
	        ;
    });

// page ready?
    d3.select('#wait')
        .classed("hidden", true);
    Session.set('ispageReady', true);

} /* --end-- */
