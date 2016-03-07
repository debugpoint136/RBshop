/*----start Global Variable ----*/

var chrLst = ["chr1", "chr2", "chr3", "chr4", "chr5", "chr6", "chr7", "chr8", "chr9", "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr20", "chr21", "chr22", "chrX", "chrY"];
var lst2=[], lst=chrLst;
lst2 = ["chr1", 249250621, "chr2", 243199373, "chr3", 198022430, "chr4", 191154276, "chr5", 180915260, "chr6", 171115067, "chr7", 159138663, "chr8", 146364022, "chr9", 141213431, "chr10", 135534747, "chr11", 135006516, "chr12", 133851895, "chr13", 115169878, "chr14", 107349540, "chr15", 102531392, "chr16", 90354753, "chr17", 81195210, "chr18", 78077248, "chr19", 59128983, "chr20", 63025520, "chr21", 48129895, "chr22", 51304566, "chrX", 155270560, "chrY", 59373566];
var chrLengths = { 
		"chr1": 249250621, "chr2": 243199373, "chr3": 198022430, "chr4": 191154276, "chr5": 180915260, "chr6": 171115067, "chr7": 159138663, "chr8": 146364022, "chr9": 141213431, "chr10": 135534747, "chr11": 135006516, "chr12": 133851895, "chr13": 115169878, "chr14": 107349540, "chr15": 102531392, "chr16": 90354753, "chr17": 81195210, "chr18": 78077248, "chr19": 59128983, "chr20": 63025520, "chr21": 48129895, "chr22": 51304566, "chrX": 155270560, "chrY": 59373566
		};
// declare SVG properties
var margin = {top: 50, right: 20, bottom: 10, left: 50};
var width = 1200;
var height = 750;
var chrLen_scale = d3.scale.linear().range([0, width - margin.right - margin.left - 75]);
	chrLen_scale.domain([0, d3.max(d3.values(chrLengths))]);
var colors = ['#FF0000', '#FF1717', '#FF2E2E', '#FF4545', '#FF5C5C', '#FF7373', '#FF8B8B', '#FFA2A2', '#FFB9B9', '#FFD0D0', '#FFFFFF', '#D0D0FF', '#B9B9FF', '#A2A2FF', '#8B8BFF', '#7373FF', '#5C5CFF', '#4545FF', '#2E2EFF', '#1717FF', '#0000FF'];  // '#FFE7E7', '#FFFFFF', '#E7E7FF'

/*----end----*/
Template.genomeView.onCreated(function () {
	Session.set('ispageReady', false);
});

Template.genomeView.onRendered(function () {
	
	var coordinate = Session.get('coordinate');
	
		// /*TEST*/ coordinate = ["GSM945188", "L1HS"];
	var subfamid = coordinate[1];
	var geoid 	 = coordinate[0];
	var viewKey  = Meteor.uuid().split('-').join('');

// Fetch data - DONE :)
	var bev = {}, data = {};
	/* PROD */ getsubfamcopies( subfamid, geoid, viewKey, 'getsubfamcopieswithtk' , bev, data); 
	/* PROD */ // make_genomebev_base();
	/* TEST */ // parseData_exp_bev();

	
	//		 make_genomebev_base(vobj,data.key);  -- BASE CREATED
	//       parseData_exp_bev(data,vobj,vobj.bev);
	//       make_bevcolorscale(vobj,vobj.bev,data.key);
	//       draw_genomebev_experiment(vobj,vobj.bev);
	/* 		 rank the repeats by assay value  */
});

/*############# functions ###############*/

function getsubfamcopies(sid, geoid, viewKey, urlParam, bev, data)
{
     
    var CFSobj = {};
	d3.csv('/CFS.csv', function(data) {
		data.forEach(function(d) {
			CFSobj[d.subfamily] = d;
		});

		var s = CFSobj[sid];
		var subfamTrackParamString =  '&rpbrDbname=hg19repeat&dbName=hg19&rpbr_class='+s.class+'&rpbr_family='+s.family+'&rpbr_subfam='+s.subfamily.replace('/','_')+'&chrlst='+lst2.join(',');

		if ( urlParam === 'getsubfamcopiesonly') {
			var urlRequestString = 'repeatbrowser=on&getsubfamcopiesonly=on' + subfamTrackParamString;
			callAPI( urlParam, urlRequestString , bev, data);
		} else if ( urlParam === 'getsubfamcopieswithtk' ) {
			var urlRequestString = 'repeatbrowser=on&getsubfamcopieswithtk=on' + subfamTrackParamString + '&geo=' + geoid + '&viewkey=' + viewKey;
			callAPI( urlParam, urlRequestString , bev, data);
		} else {
			return 'Invalid URL param';
		}
	}); /*---end d3.csv call---*/
}

function callAPI(apiName, url, bev, data) {

	Meteor.call(apiName, url, function(error, res) {
	  if (!error) {
	        var data = eval('(' + res + ')');
	        /* PROD */  make_genomebev_base(data, bev); 
	        // parseData_exp_bev(data);
			
	  } else {
	    console.log(error);
	  }
	});
}

function make_genomebev_base(data, bev) {
    
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
        .attr("x", 0)
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
        	return chrLen_scale(d);
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
		.attr("x", -40)
		.attr("dy","0.15em")
		.attr("y", function (d, i) {
        	return i * 30 + 12;
    	})
    	;

	// mousemove - genomebev_tooltip_mousemove

	// mouseout - pica_hide

	// mousedown - genomebev_zoomin_md

	bev.genomebev_base = svg;
	bev.chrLen_scale = chrLen_scale;

	parseData_exp_bev(data, bev);
}

function parseData_exp_bev(data, bev) {

	var chr2data={};
	for(var i=0; i<chrLst.length; i++)
        chr2data[chrLst[i]]=[];

    var has_input = 0; // TODO: Check if input exists
    var Data=[];

    for(i=0; i<data.genomecopies.length; i++) {
        var lst=data.genomecopies[i].split(' ');
        var s=lst[5].split(',');
        var ts=[];
        // need to skip the last comma
        for(var j=0; j<s.length-1; j++) ts.push(parseFloat(s[j]));
        var is=[];
        if(has_input) {
            s=lst[6].split(',');
            for(j=0; j<s.length-1; j++) is.push(parseFloat(s[j]));
        }
        Data.push([lst[0],parseInt(lst[1]),parseInt(lst[2]), lst[3], parseInt(lst[4]), ts, is]);
        /* 0 chrom
         1 start
         2 stop
         3 strand
         4 bed item id
         5 [] treat score
         6 [] input score, could be empty
         */
	}
         /* figure out *baseline* value for both treatment and input in computing ratio,
     	(not the baseline for color scale)
    	 any value lower than baseline will be replaced by baseline
    	 */

    	var treatValueLst=[];
	    var inputValueLst=[];
	    var mean_t=0; // mean of treatment
	    var mean_i=0; // mean of input
	    var count=0; // divisor

	    for( i = 0; i < Data.length; i++ ) {
	        var x = Data[i];
	        count++;
	        { // treat
	            var s = 0;
	            for( var j=0; j < x[5].length; j++ ) s+=x[5][j];  // iterate over treat - add and average
	            var v = s/j;
	            treatValueLst.push(v);
	            mean_t += v;  // adding all v gives average of treatment values - clever :)
	        }
	        if(has_input) {
	            // input
	            var s = 0;
	            for( var j = 0; j < x[6].length; j++ ) s += x[6][j];
	            var v = s/j;
	            inputValueLst.push(v);
	            mean_i += v;
	        }
	    }

        mean_t /= count;
	    mean_i /= count;
		    /* important change here
		     if actual value is lower than mean_t/_i, replace with 1
		     so that their log ratio can be 0
		     */
	   for( i = 0; i < treatValueLst.length; i++ ) {
	        var v = treatValueLst[i];
	        treatValueLst[i] = v < mean_t ? 1 : v;
    	  } /*--for loop--*/

    	  if(has_input) {
	        for( i = 0; i < inputValueLst.length; i++ ) {
	            var v = inputValueLst[i];
	            inputValueLst[i] = v < mean_i ? 1 : v;
	        }
	    }

	   // compute ratio for each individual repeat 
	   	var minv = 0, maxv = 0;
	    for( i = 0; i < Data.length; i++ ) {
	        var x = Data[i];
	        var v = treatValueLst[i];
	        if( has_input ) {
	            v = Math.log( v/inputValueLst[i] ) / Math.log(2);
	        }
	        if( v > maxv ) maxv = v;
	        else if( v < minv ) minv = v;
	        chr2data[x[0]].push([x[1],x[2],x[3],x[4],v]);
	        /*
	         0 start
	         1 stop
	         2 strand
	         3 bed item id
	         4 log ratio
	         */
	    }

	    // example entry in Data array: ["chrY", 8178186, 8179010, "+", 1517, Array[2], Array[1]]
	    /* !! this array must be sorted by chromosomal order
	     or tooltipping won't work
	     */
	    for(var c in chr2data)
	        chr2data[c].sort(coordSort);
	    
	    bev.data = chr2data;
	    bev.minv = minv;
	    bev.maxv = maxv;

	    var colorScale = d3.scale.quantile()
                .domain([minv, 0, maxv])
                .range(colors);

        bev.colorScale = colorScale;

	    draw_genomebev_experiment(bev);
}

function make_bevcolorscale(bev) {

	// csbj - track-specific colorscale runtime object, attached to a bev object
	var csbj={baseline:0}; // colorscale object, track-specific

	/***** draw the color scale panel ***/
    /* 1. calculate distribution, width of color scale defines resolution
     in calculating ratio, many te got value of 0 for below baseline
     the 0 ratio count must be escaped so it won't screw histogram
     */
    var chr2data=bev.data;
    var minv=bev.minv;
    var maxv=bev.maxv;
    var arr=[]; // histogram

    // this is all about the slider so skipping it for now
}


function draw_genomebev_experiment(bev)
{
    /* draw bev graph on which the TEs from a subfam is plotted
     colored by experiment assay data
    */
    var chr2xpos = {};
    var basev = -0.01656745516965108; //HARDCODED!! TODO: this should come with bev.csbj.baseline;
    var num = 0;
    var clst = chrLst;

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
	        	return chrIndex * 30;
	        })
	        .attr("class", function (d, i) {
	            return 'top chr' + i + 'Ticks';
	        })
	        .attr("width", 1)
	        .attr("height", 17)
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

/*
colorscale_slidermoved
colorscale_slider_md
colorscale_slider_mm
colorscale_slider_mu
scoredistribution_mm
beam_rankitem - on click on Download button // s.addEventListener('click',beam_rankitem,false);
add2gg_invoketkselect  // Add another experiment
*/

/* more util functions */
function coordSort(a,b) {return a[0]-b[0];}

Template.genomeView.helpers({
    pageReady: function () { 
    	return Session.get('ispageReady')
    }
});
