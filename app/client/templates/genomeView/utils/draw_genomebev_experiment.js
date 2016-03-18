draw_genomebev_experiment = function(bev, props)
{
    /* draw bev graph on which the TEs from a subfam is plotted
     colored by experiment assay data
    */
    var chr2xpos = {};
    var basev = -0.01656745516965108; //HARDCODED!! TODO: this should come with bev.csbj.baseline;
    var num = 0;
    var chrLst = props.chrLst;

    var svg = bev.genomebev_base;

    chrLst.forEach(function(chrNum, chrIndex) {
        var chrTicks = svg.append('g')
    		.selectAll('chrTicks')
    		.data(d3.values(bev.data[chrNum]))
    		.enter()
    		.append("rect")
	        .attr("x", function(d, i) {
	        	return  bev.chrLen_scale( d[0] ) ;
	        })
	        .attr('fill', function(d, i) {
	        	return bev.colorScale( d[4] );
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

        /* TODO : remove all elements on the chromosome when threshold changes */
        
    //     var xpos = [];
    //     for( var j = 0; j < dd.length; j++ ) {
    //         // [ start, stop, strand, swscore ]
    //         var vobj_type = 2; // FIXME
    //         var v = dd[j][( vobj_type == 1 ? 3 : 4 )];
    //         var apps_gg_sf = 0.000004413228723710983; // FIXME : reduction factor
    //         var x = apps_gg_sf * dd[j][0]; 
    //         if( v < basev ) {
    //             // ctx.fillStyle='rgba(0,0,255,'+((basev-v)/(basev-bev.minv))+')';
    //             /* create a rectangle at this spot, 1 unit wide */
    //         } else {
    //             num ++;
    //             // ctx.fillStyle='rgba(255,255,0,'+((v-basev)/(bev.maxv-basev))+')';
    //         }
    //         // ctx.fillRect(x,0,1,c.height);		// make a rect 1 width wide
    //         xpos.push(x);
    //     }
    //     chr2xpos[clst[i]]=xpos;
    // // }  // end of top for loop
    // bev.chr2xpos=chr2xpos;

    // TODO : make sure the coloring is working fine
    // what's the deal with chr2xpos
} /* --end--:draw_genomebev_experiment--*/
