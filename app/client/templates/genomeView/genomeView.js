/*----start Global Variable ----*/

var coordinate = Session.get('coordinate');
var chrLst = ["chr1", "chr2", "chr3", "chr4", "chr5", "chr6", "chr7", "chr8", "chr9", "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr20", "chr21", "chr22", "chrX", "chrY"];
/*TEST*/ coordinate = ["GSM935576", "AluJb"];

var subfamid = coordinate[1];
var geoid 	 = coordinate[0];
var viewKey  = Meteor.uuid().split('-').join('');
var lst2=[], lst=chrLst;
lst2 = ["chr1", 249250621, "chr2", 243199373, "chr3", 198022430, "chr4", 191154276, "chr5", 180915260, "chr6", 171115067, "chr7", 159138663, "chr8", 146364022, "chr9", 141213431, "chr10", 135534747, "chr11", 135006516, "chr12", 133851895, "chr13", 115169878, "chr14", 107349540, "chr15", 102531392, "chr16", 90354753, "chr17", 81195210, "chr18", 78077248, "chr19", 59128983, "chr20", 63025520, "chr21", 48129895, "chr22", 51304566, "chrX", 155270560, "chrY", 59373566];
var chrLengths = { 
		"chr1": 249250621, "chr2": 243199373, "chr3": 198022430, "chr4": 191154276, "chr5": 180915260, "chr6": 171115067, "chr7": 159138663, "chr8": 146364022, "chr9": 141213431, "chr10": 135534747, "chr11": 135006516, "chr12": 133851895, "chr13": 115169878, "chr14": 107349540, "chr15": 102531392, "chr16": 90354753, "chr17": 81195210, "chr18": 78077248, "chr19": 59128983, "chr20": 63025520, "chr21": 48129895, "chr22": 51304566, "chrX": 155270560, "chrY": 59373566
		};

/*----end----*/

Template.genomeView.onRendered(function () {

// Fetch data - DONE :)
	/* PROD */ getsubfamcopies( subfamid, 'getsubfamcopieswithtk' ); 
	/* PROD */ // make_genomebev_base();
	/* TEST */ // parseData_exp_bev();

	
	//		 make_genomebev_base(vobj,data.key);  -- BASE CREATED
	//       parseData_exp_bev(data,vobj,vobj.bev);
	//       make_bevcolorscale(vobj,vobj.bev,data.key);
	//       draw_genomebev_experiment(vobj,vobj.bev);
	/* 		 rank the repeats by assay value  */
});

/*############# functions ###############*/

function callAPI(apiName, url) {

	Meteor.call(apiName, url, function(error, res) {
	  if (!error) {
	        var data = eval('(' + res + ')');
	        /* PROD */ // make_genomebev_base(); 
	        parseData_exp_bev(data);
			
	  } else {
	    console.log(error);
	  }
	});
}


function getsubfamcopies(sid, urlParam)
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
			callAPI( urlParam, urlRequestString );
		} else if ( urlParam === 'getsubfamcopieswithtk' ) {
			var urlRequestString = 'repeatbrowser=on&getsubfamcopieswithtk=on' + subfamTrackParamString + '&geo=' + geoid + '&viewkey=' + viewKey;
			callAPI( urlParam, urlRequestString );
		} else {
			return 'Invalid URL param';
		}
	}); /*---end d3.csv call---*/
}


function make_genomebev_base() {

	// declare SVG properties
	var margin = {top: 50, right: 20, bottom: 20, left: 50};
	var width = 1200;
	var height = 500;

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
	        .attr('fill', 'LightSlateGray')
	        .attr("y", function (d, i) {
	            return i * 20;
	        })
	        .attr("class", function (d, i) {
	            return " chr chr-border chr" + i;
	        })
	        .attr("width", function(d) {
	        	return 0.000004413228723710983 * d - 50; // TODO: Reduction factor based on screen size
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
    		.attr("dy","0.35em")
    		.attr("y", function (d, i) {
            	return i * 20 + 8;
        	})
        	;

	// mousemove - genomebev_tooltip_mousemove

	// mouseout - pica_hide

	// mousedown - genomebev_zoomin_md

}

function parseData_exp_bev(data) {

	var chr2data={};
	for(var i=0; i<chrLst.length; i++)
        chr2data[chrLst[i]]=[];

    var has_input = 1; // Check if input exists
    var Data=[];

    for(i=0; i<data.genomecopies.length; i++) {
        var lst=data.genomecopies[i].split(' ');
        var s=lst[5].split(',');
        var ts=[];
        // need to skip the last comma
        for(var j=0; j<s.length-1; j++) ts.push(parseFloat(s[j]));
        var is=[];
       /* if(has_input) {
            s=lst[6].split(',');
            for(j=0; j<s.length-1; j++) is.push(parseFloat(s[j]));
        }*/
        Data.push([lst[0],parseInt(lst[1]),parseInt(lst[2]), lst[3], parseInt(lst[4]), ts, is]);
        /* 0 chrom
         1 start
         2 stop
         3 strand
         4 bed item id
         5 [] treat score
         6 [] input score, could be empty
         */

         /* figure out *baseline* value for both treatment and input in computing ratio,
     	(not the baseline for color scale)
    	 any value lower than baseline will be replaced by baseline
    	 */
   }
}



/*
colorscale_slidermoved
colorscale_slider_md
colorscale_slider_mm
colorscale_slider_mu
scoredistribution_mm
beam_rankitem - on click on Download button // s.addEventListener('click',beam_rankitem,false);
add2gg_invoketkselect  // Add another experiment
*/

