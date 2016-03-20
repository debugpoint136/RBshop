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

    // var bev = Session.get('redrawbev');
    var svg = bev.genomebev_base;
    //var svg = Session.get('genomebevBase');
    var s = Session.get('selectedbySlider');

    chrLst.forEach(function(chrNum, chrIndex) {
           svg
            .selectAll('rect')
            .data(d3.values(bev.data[chrNum]))
            .exit()
            .remove()
            ;
    });

    chrLst.forEach(function(chrNum, chrIndex) {
        var chrTicks = svg.append('g')
    		.selectAll('chrTicks')
    		.data(d3.values(bev.data[chrNum]))
    		.enter()
    		.append("rect")
            .filter(function(d) { return s[0] <= d[4] && d[4] <= s[1] })
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
	        .attr("width", 1)
	        .attr("height", 11)
	        ;
    });

// page ready?
    Session.set('ispageReady', true);

} /* --end-- */
