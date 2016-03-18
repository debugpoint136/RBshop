getsubfamcopies = function(sid, geoid, viewKey, urlParam, bev, data, lst2, props)
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
			callAPI( urlParam, urlRequestString , bev, data, props);
		} else if ( urlParam === 'getsubfamcopieswithtk' ) {
			var urlRequestString = 'repeatbrowser=on&getsubfamcopieswithtk=on' + subfamTrackParamString + '&geo=' + geoid + '&viewkey=' + viewKey;
			callAPI( urlParam, urlRequestString , bev, data, props);
		} else {
			return 'Invalid URL param';
		}
	}); /*---end d3.csv call---*/
}