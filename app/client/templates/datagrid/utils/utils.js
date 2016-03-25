
createAssaySampleGrid = function() {

	// TODO : use SampleRows and AssayCols to construct a 2D matrix out of AssaySample2D
	Object.keys(AssayCols).forEach(function(a){
		var tmp = [];
		Object.keys(SampleRows).forEach(function(s){
			var pin = AssaySample2Dobj[a][s];
			tmp.push(pin);
		});
		AssayBySample2D[a] = tmp;
	});
}

/* ================================================================ */

         
getUniqueElmntsInArray = function(tmp) {
	return tmp.filter(function(item, i, ar){ 
		return ar.indexOf(item) === i; 
	});
}

formatSpace = function(str) {
    return str.replace(/ /g,"_");
}
