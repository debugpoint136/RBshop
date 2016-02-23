fs = require('fs');
d3 = require('d3');

var cfs = {};

fs.readFile('./CFS.csv', 'utf8', function (err, data) {
   var dataset = d3.csv.parse(data);
   var dataNested =d3.nest()
		  .key(function(d) {return d.class;})
		  .key(function(d) {return d.family;})
		  .sortKeys(d3.ascending)
		  //.entries(datatsv)
		  .map(dataset)
	Object.keys(dataNested).forEach(function(className) {
		//console.log("=======" + className + "========");
		var classColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		Object.keys(dataNested[className]).forEach(function(familyName) {
			//console.log("\t-----" + familyName + "----");
			var familyColor = '#'+Math.floor(Math.random()*16777215).toString(16);
			dataNested[className][familyName].forEach(function(subfamilyName) {
				//console.log("\t\t" + subfamilyName.subfamily);
				var subfamilyColor = '#'+Math.floor(Math.random()*16777215).toString(16);
				cfs[subfamilyName.subfamily] = [familyName, className, classColor, familyColor, subfamilyColor];
			});
		});
	});
	console.log(JSON.stringify(cfs));
});



    


    
