getsubfamcopies = function(sid, geoid, viewKey, urlParam)
{
    var chrLstSize = ["chr1", 249250621, "chr2", 243199373, "chr3", 198022430, "chr4", 191154276, "chr5", 180915260, "chr6", 171115067, "chr7", 159138663, "chr8", 146364022, "chr9", 141213431, "chr10", 135534747, "chr11", 135006516, "chr12", 133851895, "chr13", 115169878, "chr14", 107349540, "chr15", 102531392, "chr16", 90354753, "chr17", 81195210, "chr18", 78077248, "chr19", 59128983, "chr20", 63025520, "chr21", 48129895, "chr22", 51304566, "chrX", 155270560, "chrY", 59373566]; 
    var CFSobj = {};
	d3.csv('/CFS.csv', function(data) {
		data.forEach(function(d) {
			CFSobj[d.subfamily] = d;
		});

		var s = CFSobj[sid];
		var subfamTrackParamString =  '&rpbrDbname=hg19repeat&dbName=hg19&rpbr_class='+s.class+'&rpbr_family='+s.family+'&rpbr_subfam='+s.subfamily.replace('/','_')+'&chrlst='+ chrLstSize.join(',');

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