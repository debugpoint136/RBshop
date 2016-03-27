makeDataFrameforHeatmap = function() {
	Tracker.autorun(function() {

		// get list of datasets and subfamilies
		var subfamList = [];
        	sampleList = [];

        if ( Session.get('ssnTEselected') )
        	subfamList = Session.get('ssnTEselected');

        if (Session.get('datasetsforBrowsing'))
        	sampleList = Session.get('datasetsforBrowsing');

        // if ( sampleList.length > 0 || subfamList.length > 0)
        wrangleDataforHeatmap( sampleList, subfamList , function(props) {
        	createHeatmapArtBoard(props); //:then
        });
	}); 
}

wrangleDataforHeatmap = function(sampleList, subfamList, cb) {

	/* Declare all the variables */
	var heatMapProps = {}; // the variables will take a ride on props downstream
	// var row_number = sampleList.length,
	// 	col_number = subfamList.length;

	var	colLabel = [],
		rowLabel = [],
		selectedSubfam = []
		data = [],
		dataRatio = [],
		datasetNames = [],
		forScale = []
		;

    // Pull data from mongo db
    var datasets = Datasets.find({});
    var subfam = Subfam.find({}).fetch();

    var col_number = subfam.length;
    var row_number = datasets.fetch().length;

    subfam.forEach(function(doc) {
        colLabel.push(doc.name);
        selectedSubfam.push(doc._id);
    });

    datasets.forEach(function(doc) {
        datasetNames.push(doc.name);
        rowLabel.push(doc.label);
        var tmp = [];

        var arr = doc.ratio_all.split(',');
        selectedSubfam.forEach(function(subfamid){
            tmp.push(parseFloat(arr[subfamid - 1]));
        });
        dataRatio.push(tmp);
        }
    );


    // parse data ratio - and dump it in data array
    for (var i = 0; i < dataRatio.length; i++) {
        var row = dataRatio[i];
        for (var j = 0; j < col_number; j++) {
            var cellObj = {}; // tmp obj
            cellObj['row'] = i + 1;
            cellObj['col'] = j + 1;
            cellObj['value'] = row[j];

            forScale.push(row[j]);

            data.push(cellObj);
        }
    }

    var hcrowStart = 1, hcrowEnd = row_number;
    var hccolStart = 1, hccolEnd = col_number;
    var hcrow = [], hccol = [];

    for (var i = hcrowStart; i <= hcrowEnd; i++) {
        hcrow.push(i);
    }

    for (var j = hccolStart; j <= hccolEnd; j++) {
        hccol.push(j);
    }

    RdBu = ["#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac"];
    BuRd = RdBu.reverse();
    Blues = ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"];
    // Blues = ["#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"];
    Reds  = ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"];  

    var sizeExtent = d3.extent(forScale);
    var colorDomain = [-4,-3, -2, -1, 0, 1, 2, 3, 4];

    var negExtent = [ sizeExtent[0], 0 ];
    var posExtent = [ 0, (sizeExtent[1]) ]; 

    var negColorScale = d3.scale.quantize()
                 .domain(negExtent).range(Blues.reverse());

    var posColorScale = d3.scale.quantize()
                 .domain(posExtent).range(Reds);
    
    var colorScale = d3.scale.quantile()
                .domain([-4, 0, 4])
                .range(RdBu);  


    // Set all the values to hitch around downstream to all components

    heatMapProps = {
    	'rowLabel': rowLabel,
    	'colLabel': colLabel,
    	'rows': row_number,
    	'cols': col_number,
    	'data': data,
    	'datasets': datasets,
    	'datasetNames': datasetNames,
    	'hcrow': hcrow,
    	'hccol': hccol,
        'colorScale': colorScale,
        'colors': BuRd,
        'negColorScale': negColorScale,
        'posColorScale': posColorScale
};

	cb(heatMapProps);    
}