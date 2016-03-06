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
	/* PROD */ //getsubfamcopies( subfamid, 'getsubfamcopieswithtk' ); 
	/* TEST */ make_genomebev_base();

	
	//		 make_genomebev_base(vobj,data.key);
	//       parseData_exp_bev(data,vobj,vobj.bev);
	//       make_bevcolorscale(vobj,vobj.bev,data.key);
	//       draw_genomebev_experiment(vobj,vobj.bev);
	/* 		 rank the repeats by assay value  */
});

/*############# functions ###############*/

function callAPI(apiName, url) {

	Meteor.call(apiName, url, function(error, res) {
	  if (!error) {
	        var data = res;
	        make_genomebev_base(data); 
			
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


function make_genomebev_base(data) {
	console.log('Inside make_genomebev_base');
	// Just draw 24 rectangles
	// 0.000004413228723710983 * browser.genome.scaffold.len['chr1']

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
	        	console.log(i + ": "+ d);
	            return i * 20;
	        })
	        .attr("class", function (d, i) {
	            return " chr chr-border chr" + i;
	        })
	        .attr("width", function(d) {
	        	return 0.000004413228723710983 * d - 50; 
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



/*
colorscale_slidermoved
colorscale_slider_md
colorscale_slider_mm
colorscale_slider_mu
scoredistribution_mm
beam_rankitem - on click on Download button // s.addEventListener('click',beam_rankitem,false);
add2gg_invoketkselect  // Add another experiment
*/

