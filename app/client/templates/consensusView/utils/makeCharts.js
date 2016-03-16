makeCharts = function(data){
	var maxScaleVal = calcMaxValforScale(data);
	var chartObj = {};

	// treatment files
	var trtNum = 0;
	Object.keys(data.treatment).forEach(function(trt) {
		trtNum++;
		var chartObj = {};
		chartObj['divElement'] = 'treatment' + trtNum;
		chartObj['banner'] = trt;

		chartObj['bwa'] = data.treatment[trt][0].iteres;
		chartObj['iteres'] = data.treatment[trt][1].bwa;

		// compute relative yScale

		var yValIteres = d3.max(data.treatment[trt][0].iteres);
		var yValBWA =  d3.max(data.treatment[trt][1].bwa);
		var higherVal = d3.max([yValIteres, yValBWA]);

		var normVal = higherVal / maxScaleVal;
		chartObj['maxScaleVal'] = maxScaleVal;
		
		makeHCGraphs(chartObj);
	});

	// check if input files
	if ( data.input ){
		var inpNum = 0;
		Object.keys(data.input).forEach(function(trt) {
		inpNum++;
		var chartObj = {};
		chartObj['divElement'] = 'input' + inpNum;
		chartObj['banner'] = trt;

		chartObj['iteres'] = data.input[trt][0].iteres;
		chartObj['bwa'] = data.input[trt][1].bwa;

		// compute relative yScale

		var yValIteres = d3.max(data.input[trt][0].iteres);
		var yValBWA =  d3.max(data.input[trt][1].bwa);
		var higherVal = d3.max([yValIteres, yValBWA]);

		var normVal = higherVal / maxScaleVal;

		chartObj['maxScaleVal'] =  maxScaleVal;
		
		makeHCGraphs(chartObj);

	});
	}
}