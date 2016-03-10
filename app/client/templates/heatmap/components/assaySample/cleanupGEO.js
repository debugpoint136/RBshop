cleanUpGEO = function(res, geoFlat) {
	res.forEach(function(d) {
        if (d.geo) {
      	var geoName = d.geo[0];
          // Re-format the objects 
        var obj = {};

        obj['name'] = d.name;
        obj['detail_url'] = d.detail_url;
        obj['metadata'] = d.metadata;
        obj['type'] = d.type;
        obj['public'] = d.public;
        obj['url'] = d.url;

        // var metadata = d.name.split(' ');

        if (geoFlat[geoName]) {
          geoFlat[geoName].push(obj);
        } else {
          geoFlat[geoName] = [obj];
        }
        }   
    });
};

