make_genomebev_base = function(data, bev, props) {

    var width = props.width,
        height = props.height,
        margin = props.margin,
        chrLengths = props.chrLengths;
        chrLen_scale = props.chrLen_scale;

    
	svg = d3.select('#genomeviewArtboard').append("svg")
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

	bev.genomebev_base = svg;
    Session.set('genomebevBase', svg);

	bev.chrLen_scale = chrLen_scale;

	parseData_exp_bev(data, bev, props);
}