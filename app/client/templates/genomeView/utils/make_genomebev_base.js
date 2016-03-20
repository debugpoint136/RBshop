make_genomebev_base = function() {

    var margin  =   GVprops.margin,
        width   =   GVprops.width,
        height  =   GVprops.height,
        chrLengths = GVprops.chrLengths,
        chrLen_scale = GVprops.chrLen_scale,
        colors  =   GVprops.colors,
        chrLst = GVprops.chrLst; 
    
	var svg = d3.select('#genomeviewArtboard').append("svg")
		.attr("width", width + margin.left + margin.right)  // Expanded the drawing canvas
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")// moved the brush
        ;

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

    var chrNames = svg.append('g')
		.selectAll('chrname')
		.data(d3.keys(chrLengths))
		.enter()
		.append('text')
		.text(function(d) {
			return d;
		})
		.attr('class', 'mono')
		.attr("x", -45)
		.attr("dy","0.15em")
		.attr("y", function (d, i) {
        	return i * 30 + 12;
    	})
    	;

	// mousemove - genomebev_tooltip_mousemove

	// mouseout - pica_hide

	// mousedown - genomebev_zoomin_md

	// bev.genomebev_base = svg;
    

    var s = [0.3, 0.5];


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
                return colorScale( d[4] );
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
    bev.genomebev_base = svg;
// page ready?
    Session.set('ispageReady', true);
}