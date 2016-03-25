makeDataframe = function(samplePins) {
	
	Tracker.autorun(function() {
        var assayPins = [];
        var assayList = Session.get('acSelected');
        var samplePins = [];
        var sampleList = Session.get('tissuesSelected');
        var rowLabels = [];

        sampleList.forEach(function(s) {
            samplePins.push(SampleRows[s]);
            rowLabels.push(s);
        });

        assayList.forEach(function(a) {
            assayKeys[a].forEach(function(assayLeaf) {
                assayPins.push(assayLeaf);
            });
        });

        
        var dataframe = {};

        assayPins.forEach(function(assayPin) {
        	var sampleTarget = [];

        	var tmp = AssayBySample2D[assayPin];
        	samplePins.forEach(function(s) {
	        	sampleTarget.push( tmp[s] );
	        });
	        dataframe[assayPin] = sampleTarget;
        });
        
        
        var assayLabels = [];
        var formattedData = [];

        Object.keys(dataframe).forEach(function(assay, i) {
			assayLabels.push(assay);
			dataframe[assay].forEach(function(sval, j) {
				var cellObj = {}; // tmp obj
				if ( sval ) {
		            cellObj['row'] = j;
		            cellObj['col'] = i;
		            cellObj['val'] = sval.length;
		            cellObj['datasets'] = sval.join('_');
		            formattedData.push(cellObj);
				} else {
					cellObj['row'] = j;
		            cellObj['col'] = i;
		            cellObj['val'] = 0;
		            formattedData.push(cellObj);
				}
			});
		});


		var superProps = {};
		superProps.colLabel = assayLabels;
		superProps.rowLabel = rowLabels;
		superProps.data = formattedData;

		// pass.this(dataframe); // call re-draw function here

		if ( Session.get('tissuesSelected').length > 0 && 
			 Session.get('acSelected').length > 0 ) { 
			drawGrid(superProps);
		}	
    });
}
