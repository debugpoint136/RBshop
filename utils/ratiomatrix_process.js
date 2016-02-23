fs = require('fs');
d3 = require('d3');
var tsv = d3.dsv("\t");
rmfile = process.argv[2];


// Read in the file

fs.readFile(rmfile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  processData(data);
});


function processData(datafile) {

	var datatsv =  tsv.parse(datafile);
	var data=d3.nest()
		  .key(function(d) {return d.datasetId;})
		  .key(function(d) {return d.subfamId;})
		  .sortKeys(d3.ascending)
		  //.entries(datatsv)
		  .map(datatsv)

    // console.log('DatasetId' + '\t' + 'JSON_ratios');

    var ratioObj = {} // this is the main object that stores flattened ratio matrix
        
        for (var i = 1; Object.keys(data).length >= i; i++) {
            // dataset loop
            var obj = data[i];

            var ratios = {} // temp obj to hold below arrays

            // reset array
            var subfamilyRatiosAll = [];
            var subfamilyRatiosUniq = [];


            for (var j = 1; Object.keys(obj).length >= j; j++) {
                // subfamily loop
                subfamilyRatiosUniq.push(parseFloat(obj[j]['0'].ratioUniq));
                subfamilyRatiosAll.push(parseFloat(obj[j]['0'].ratioAll));  
            };

            /*ratios['all'] = subfamilyRatiosAll;
            ratios['uniq'] = subfamilyRatiosUniq;
            ratioObj[i] = ratios;*/

            console.log(subfamilyRatiosUniq.join(',') + '\t' + subfamilyRatiosAll.join(','));
        };
}
