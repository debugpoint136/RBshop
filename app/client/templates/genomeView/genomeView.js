/*----start Global Variable ----*/

var chrLst = ["chr1", "chr2", "chr3", "chr4", "chr5", "chr6", "chr7", "chr8", "chr9", "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr20", "chr21", "chr22", "chrX", "chrY"];
var chrLstSize = ["chr1", 249250621, "chr2", 243199373, "chr3", 198022430, "chr4", 191154276, "chr5", 180915260, "chr6", 171115067, "chr7", 159138663, "chr8", 146364022, "chr9", 141213431, "chr10", 135534747, "chr11", 135006516, "chr12", 133851895, "chr13", 115169878, "chr14", 107349540, "chr15", 102531392, "chr16", 90354753, "chr17", 81195210, "chr18", 78077248, "chr19", 59128983, "chr20", 63025520, "chr21", 48129895, "chr22", 51304566, "chrX", 155270560, "chrY", 59373566];
var chrLengths = { 
		"chr1": 249250621, "chr2": 243199373, "chr3": 198022430, "chr4": 191154276, "chr5": 180915260, "chr6": 171115067, "chr7": 159138663, "chr8": 146364022, "chr9": 141213431, "chr10": 135534747, "chr11": 135006516, "chr12": 133851895, "chr13": 115169878, "chr14": 107349540, "chr15": 102531392, "chr16": 90354753, "chr17": 81195210, "chr18": 78077248, "chr19": 59128983, "chr20": 63025520, "chr21": 48129895, "chr22": 51304566, "chrX": 155270560, "chrY": 59373566
		};
// declare SVG properties
var margin = {top: 50, right: 20, bottom: 10, left: 50};
var width = 1200;
var height = 750;
var chrLen_scale = d3.scale.linear().range([0, width - margin.right - margin.left - 75]);
//console.log(d3.max(d3.values(chrLengths)));
	chrLen_scale.domain([0, 249250621]);
// var colors = ['#FF0000', '#FF1717', '#FF2E2E', '#FF4545', '#FF5C5C', '#FF7373', '#FF8B8B', '#FFA2A2', '#FFB9B9', '#FFD0D0', '#FFFFFF', '#D0D0FF', '#B9B9FF', '#A2A2FF', '#8B8BFF', '#7373FF', '#5C5CFF', '#4545FF', '#2E2EFF', '#1717FF', '#0000FF'];  // '#FFE7E7', '#FFFFFF', '#E7E7FF'
var colors = ['#FFC107', '#C2185B'];
// var colors = ['#FFC107', '#F0971C', '#E16D31', '#D14246', '#C2185B'];
//var colors = ['#FFC107', '#E16D31', '#C2185B'];
GVprops = {
	'margin' : margin,
	'width'	 : width,
	'height' : height,
	'chrLen_scale': chrLen_scale,
	'colors'	: colors,
	'chrLengths': chrLengths,
	'chrLst'	: chrLst
};
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

// Fetch data 
	getsubfamcopies( subfamid, geoid, viewKey, 'getsubfamcopieswithtk'); 

	//		 make_genomebev_base(vobj,data.key);  -- BASE CREATED
	//       parseData_exp_bev(data,vobj,vobj.bev);
	//       make_bevcolorscale(vobj,vobj.bev,data.key);
	//       draw_genomebev_experiment(vobj,vobj.bev);
	/* 		 rank the repeats by assay value  */
});

/*############# functions ###############*/
/*
colorscale_slidermoved
colorscale_slider_md
colorscale_slider_mm
colorscale_slider_mu
scoredistribution_mm
beam_rankitem - on click on Download button // s.addEventListener('click',beam_rankitem,false);
add2gg_invoketkselect  // Add another experiment
*/

Template.genomeView.helpers({
    pageReady: function () { 
    	return Session.get('ispageReady')
    },
    repeatSelected: function() {
    	return Session.get('ssnRepeatSelected');
    },
    datasetId : function() {
    	var coordinate = Session.get('coordinate');
    	return coordinate[0];
    },
    subfamid: function() {
    	var coordinate = Session.get('coordinate');
    	return coordinate[1];
    }
});

Template.genomeView.events({
     'click .wubrLink': function() {
    	//e.preventDefault();
    	rankRepeatsByAssayVal();
    }
});

