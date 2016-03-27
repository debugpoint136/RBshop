createHeatmapArtBoard = function(props) {

	var cols = props.cols,
		rows = props.rows,
		colLabel = props.colLabel,
		rowLabel = props.rowLabel;

	var cellSize = 12,
		width = cols * cellSize + 100,
		height = rows * cellSize + 100;

	props.margin = {top: 200, right: 10, bottom: 150, left: 300};
	props.cellSize = 12;
    props.width = width; 
    props.height = height; 

	var svg = d3.select("#main svg");
	svg.remove();
	var svg = d3.select("#main").append("svg")
        .attr("width", props.width + props.margin.left + props.margin.right)  
        .attr("height", props.height + props.margin.top + props.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .attr('class', 'heatmapgrid')
        ;

    drawHeatMap(props);
    drawRowLabels(props);
    drawColLabels(props);
    subFamMetaDataCells(props);
    assaySampleMetadata(props);
   	legend(props);
}