makeGEOglobal = function() {

var geoFlat = {};
var urls = {'encode': 'http://vizhub.wustl.edu/public/hg19/encode.md',
    		'roadmap': 'http://vizhub.wustl.edu/public/hg19/roadmap9_methylC.md'};

Object.keys(urls).forEach(function(url) {
	d3.json(urls[url],   function(err, res) {

	res.forEach(function(d) {
        if (d.geo) {
      	var geoName = d.geo[0];
          // Re-format the objects 
        var obj = {
        	'sample': d.metadata.Sample,
        	'assay': d.metadata.Assay,
        	'consortium': url
        };

        // obj['name'] = d.name;
        // obj['detail_url'] = d.detail_url;
        // obj['metadata'] = d.metadata;
        // obj['type'] = d.type;
        // obj['public'] = d.public;
        // obj['url'] = d.url;


        // var metadata = d.name.split(' ');

        if (geoFlat[geoName]) {
          // geoFlat[geoName].push(obj);
        } else {
          geoFlat[geoName] = obj;
        }
        }   
    });
    console.log(JSON.stringify(geoFlat));
});
});
	
}