/* from draw_genomebev_experiment.js */
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