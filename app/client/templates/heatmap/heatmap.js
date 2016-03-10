Template.Heatmap.onCreated(function () {
    Session.set('isBrowserReady', false);
});
/*****************************************************************************/
/* SubfamList: Helpers */
/*****************************************************************************/


Template.Heatmap.onRendered(function () {

    var heatmapConfig = {};

    var margin = {top: 150, right: 10, bottom: 50, left: 300},
        cellSize = 12;
    heatmapConfig['margin'] = margin;
    heatmapConfig['cellSize'] = cellSize;



    // TODO: set this dynamically based on the datasets and subfamilies selected
    var col_number = 26, 
        row_number = 11;
    heatmapConfig[ 'col_number' ] = col_number;
    heatmapConfig[ 'row_number' ] = row_number;

    var data = []; // Adding this after disabling the previously laid out structure

    var dataRatio = [];
    var datasetNames = [];

    width = cellSize * col_number, // - margin.left - margin.right,
    height = cellSize * row_number , // - margin.top - margin.bottom,

    heatmapConfig['width'] = width;
    heatmapConfig['height'] = height;

        //gridSize = Math.floor(width / 24),
    legendElementWidth = cellSize * 2.5,
    colorBuckets = 9,
        //colors = ['#005824', '#1A693B', '#347B53', '#4F8D6B', '#699F83', '#83B09B', '#9EC2B3', '#B8D4CB', '#D2E6E3', '#EDF8FB', '#FFFFFF', '#F1EEF6', '#E6D3E1', '#DBB9CD', '#D19EB9', '#C684A4', '#BB6990', '#B14F7C', '#A63467', '#9B1A53', '#91003F'];
        // colors = ['#FF0000', '#FF1717', '#FF2E2E', '#FF4545', '#FF5C5C', '#FF7373', '#FF8B8B', '#FFA2A2', '#FFB9B9', '#FFD0D0', '#FFFFFF', '#D0D0FF', '#B9B9FF', '#A2A2FF', '#8B8BFF', '#7373FF', '#5C5CFF', '#4545FF', '#2E2EFF', '#1717FF', '#0000FF'];  // '#FFE7E7', '#FFFFFF', '#E7E7FF'
       
    colors = ['#FF0000', '#FF1717', '#FF2E2E', '#FF4545', '#FF5C5C', '#FF7373', 
                    '#FF8B8B', '#FFA2A2', '#FFB9B9', '#FFD0D0', 
                    '#FFFFFF', '#D0D0FF', '#B9B9FF', '#A2A2FF', '#8B8BFF', '#7373FF', 
                    '#5C5CFF', '#4545FF', '#2E2EFF', '#1717FF', '#0000FF'];  

    colorsBR = ['#0000FF', '#2E2EFF', '#5C5CFF',
                    '#FFFFFF', '#B9B9FF', '#FFA2A2',
                    '#FF0000', '#FF2E2E', '#FF5C5C'
                    ];

    var colorScale = d3.scale.quantile()
                .domain([-1, 0, 1])
                .range(colorsBR);

    heatmapConfig['colors'] = colors;
    heatmapConfig['colorScale'] = colorScale;


    var hcrowStart = 1, hcrowEnd = row_number;
    var hccolStart = 1, hccolEnd = col_number;
    var hcrow = [], hccol = [];

    for (var i = hcrowStart; i <= hcrowEnd; i++) {
        hcrow.push(i);
    }

    heatmapConfig['hcrow'] = hcrow;


    for (var j = hccolStart; j <= hccolEnd; j++) {
        hccol.push(j);
    }
    heatmapConfig['hccol'] = hccol;

    // Pull data from mongo db
    var datasets = Datasets.find({});

    rowLabel = [];
    datasets.forEach(function(doc) {
        datasetNames.push(doc.name);
        rowLabel.push(doc.label);
        dataRatio.push(doc.ratio_uniq);
        }
    );

    heatmapConfig['rowLabel'] = rowLabel;
    heatmapConfig['datasets'] = datasets;
    heatmapConfig['datasetNames'] = datasetNames;
    heatmapConfig['data'] = data;

    var subfam = Subfam.find({});
    colLabel = [];
    subfam.forEach(function(doc) {
        colLabel.push(doc.name);
        }
    );

    heatmapConfig['colLabel'] = colLabel;


    // parse data ratio - and dump it in data array
    for (var i = 0; i < dataRatio.length; i++) {
        var row = dataRatio[i].split(',');
        for (var j = 0; j < col_number; j++) {
            var cellObj = {}; // tmp obj
            cellObj['row'] = i + 1;
            cellObj['col'] = j + 1;
            cellObj['value'] = row[j];

            data.push(cellObj);
        }
    }          

    var svg = d3.select("#main").append("svg")
        .attr("width", width + margin.left + margin.right)  // Expanded the drawing canvas
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")// moved the brush
        ;
    var rowSortOrder = false;
    var colSortOrder = false;


/*========== Row labels ===========*/
    svg = drawRowLabels(svg, heatmapConfig);

/*========== Column labels ===========*/
    // drawColLabels(svg, heatmapConfig);

/* SUBFAMILY METADATA CELLS */
// subFamMetaDataCells()
// assaySampleMetadata()
// drawHeatMap()
// legend()
  
// TODO : Drag and select should give option to zoom on on the selection
// TODO : Pan and zoom, with reset,  on these line - http://bl.ocks.org/mbostock/7ec977c95910dd026812
// TODO : Main wrapper/container should be fluid and responsive

    

/*==================LOAD COMPLETE FLAG===========*/

Session.set('isBrowserReady', true) // Place this when load complete

/*========== Change ordering of cells ===========*/

            function sortbylabel(rORc, i, sortOrder) {
                var t = svg.transition().duration(3000);
                var log2r = [];
                var sorted; // sorted is zero-based index
                

                if (rORc == "r") { // sort log2ratio of a gene
                    d3.selectAll(".c" + rORc + i)
                    .filter(function (ce) {
                        log2r.push(ce.value);
                    })
                    ;
                    sorted = d3.range(col_number).sort(function (a, b) {
                        if (sortOrder) {
                            return log2r[b] - log2r[a];
                        } else {
                            return log2r[a] - log2r[b];
                        }
                    });
                    // ** On sorting based on Row Label - CFS metadata heatmap also update
                    t.selectAll(".sfc")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;

                    t.selectAll(".sff")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                    t.selectAll(".sfsf")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;

                    // ** Done 

                    t.selectAll(".cell")
                        .attr("x", function (d) {
                            return sorted.indexOf(d.col - 1) * cellSize;
                        })
                    ;
                    t.selectAll(".colLabel")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                } else if (rORc == "sfClass"){
                    var classNames = i; // hitchhiked array with class names
                    sorted = d3.range(col_number).sort(function (a, b) {
                        if (sortOrder) {
                            return d3.ascending(classNames[a], classNames[b]);
                        } else {
                            return d3.descending(a, b);
                        }
                    });

                    t.selectAll(".sfc")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                    t.selectAll(".cell")
                        .attr("x", function (d) {
                            return sorted.indexOf(d.col - 1) * cellSize;
                        })
                    ;
                    t.selectAll(".sff")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                    t.selectAll(".sfsf")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                    t.selectAll(".colLabel")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;

                } else if (rORc == "ySample") {
                    var sampleIDs = i;
                    sorted = d3.range(row_number).sort(function (a, b) {
                        if (sortOrder) {
                            return sampleIDs[b] - sampleIDs[a];
                        } else {
                            return sampleIDs[a] - sampleIDs[b];
                        }
                    });
                    t.selectAll(".ysam")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize - cellSize;
                        })
                    ;
                    t.selectAll(".yAssay")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize - cellSize;
                        })
                    ;
                    t.selectAll(".cell")
                        .attr("y", function (d) {
                            return sorted.indexOf(d.row - 1) * cellSize;
                        })
                    ;
                    t.selectAll(".rowLabel")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;

                } else if (rORc == "yAssay") {
                    var assayIDs = i;
                    sorted = d3.range(row_number).sort(function (a, b) {
                        if (sortOrder) {
                            return assayIDs[b] - assayIDs[a];
                        } else {
                            return assayIDs[a] - assayIDs[b];
                        }
                    });
                    t.selectAll(".yAssay")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize - cellSize;
                        })
                    ;
                    t.selectAll(".ysam")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize - cellSize;
                        })
                    ;
                    t.selectAll(".cell")
                        .attr("y", function (d) {
                            return sorted.indexOf(d.row - 1) * cellSize;
                        })
                    ;
                    t.selectAll(".rowLabel")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                } else { // sort log2ratio of a contrast
                    d3.selectAll(".c" + rORc + i)
                    .filter(function (ce) {
                        log2r.push(ce.value);
                    })
                    ;
                    sorted = d3.range(row_number).sort(function (a, b) {
                        if (sortOrder) {
                            return log2r[b] - log2r[a];
                        } else {
                            return log2r[a] - log2r[b];
                        }
                    });
                    t.selectAll(".cell")
                        .attr("y", function (d) {
                            return sorted.indexOf(d.row - 1) * cellSize;
                        })
                    ;
                    t.selectAll(".rowLabel")
                        .attr("y", function (d, i) {
                            return sorted.indexOf(i) * cellSize;
                        })
                    ;
                }
            }

            d3.select("#order").on("change", function () {
                order(this.value);
            });

            function order(value) {
                if (value == "hclust") {
                    var t = svg.transition().duration(3000);
                    t.selectAll(".cell")
                        .attr("x", function (d) {
                            return hccol.indexOf(d.col) * cellSize;
                        })
                        .attr("y", function (d) {
                            return hcrow.indexOf(d.row) * cellSize;
                        })
                    ;

                    t.selectAll(".rowLabel")
                        .attr("y", function (d, i) {
                            return hcrow.indexOf(i + 1) * cellSize;
                        })
                    ;

                    t.selectAll(".colLabel")
                        .attr("y", function (d, i) {
                            return hccol.indexOf(i + 1) * cellSize;
                        })
                    ;

                } else if (value == "probecontrast") {
                    var t = svg.transition().duration(3000);
                    t.selectAll(".cell")
                        .attr("x", function (d) {
                            return (d.col - 1) * cellSize;
                        })
                        .attr("y", function (d) {
                            return (d.row - 1) * cellSize;
                        })
                    ;

                    t.selectAll(".rowLabel")
                        .attr("y", function (d, i) {
                            return i * cellSize;
                        })
                    ;

                    t.selectAll(".colLabel")
                        .attr("y", function (d, i) {
                            return i * cellSize;
                        })
                    ;

                } else if (value == "probe") {
                    var t = svg.transition().duration(3000);
                    t.selectAll(".cell")
                        .attr("y", function (d) {
                            return (d.row - 1) * cellSize;
                        })
                    ;

                    t.selectAll(".rowLabel")
                        .attr("y", function (d, i) {
                            return i * cellSize;
                        })
                    ;
                } else if (value == "contrast") {
                    var t = svg.transition().duration(3000);
                    t.selectAll(".cell")
                        .attr("x", function (d) {
                            return (d.col - 1) * cellSize;
                        })
                    ;
                    t.selectAll(".colLabel")
                        .attr("y", function (d, i) {
                            return i * cellSize;
                        })
                    ;
                }
            }

    /*========== g3 class is the body of the heatmap ===========*/

    /*var sa = d3.select(".g3")
        .on("mousedown", function () {
            if (!d3.event.altKey) {
                d3.selectAll(".cell-selected").classed("cell-selected", false);
                d3.selectAll(".rowLabel").classed("text-selected", false);
                d3.selectAll(".colLabel").classed("text-selected", false);
            }
            console.log('clicked on' + event.target);
            /!*.on("click", function (d) {
                var rowtext = d3.select(".r" + (d.row - 1));
                console.log('clicked on' + event.target.value);
                if (rowtext.classed("text-selected") == false) {
                    rowtext.classed("text-selected", true);
                } else {
                    rowtext.classed("text-selected", false);
                }
            })*!/
            var p = d3.mouse(this);
            sa.append("rect")
                .attr({
                    rx: 0,
                    ry: 0,
                    class: "selection",
                    x: p[0],
                    y: p[1],
                    width: 1,
                    height: 1
                })
        })
        .on("mousemove", function () {
            var s = sa.select("rect.selection");

            if (!s.empty()) {
                var p = d3.mouse(this),
                    d = {
                        x: parseInt(s.attr("x"), 10),
                        y: parseInt(s.attr("y"), 10),
                        width: parseInt(s.attr("width"), 10),
                        height: parseInt(s.attr("height"), 10)
                    },
                    move = {
                        x: p[0] - d.x,
                        y: p[1] - d.y
                    }
                    ;

                if (move.x < 1 || (move.x * 2 < d.width)) {
                    d.x = p[0];
                    d.width -= move.x;
                } else {
                    d.width = move.x;
                }

                if (move.y < 1 || (move.y * 2 < d.height)) {
                    d.y = p[1];
                    d.height -= move.y;
                } else {
                    d.height = move.y;
                }
                s.attr(d);

                // deselect all temporary selected state objects
                d3.selectAll('.cell-selection.cell-selected').classed("cell-selected", false);
                d3.selectAll(".text-selection.text-selected").classed("text-selected", false);

                d3.selectAll('.cell').filter(function (cell_d, i) {
                    if (
                        !d3.select(this).classed("cell-selected") &&
                            // inner circle inside selection frame
                        (this.x.baseVal.value) + cellSize >= d.x && (this.x.baseVal.value) <= d.x + d.width &&
                        (this.y.baseVal.value) + cellSize >= d.y && (this.y.baseVal.value) <= d.y + d.height
                    ) {

                        d3.select(this)
                            .classed("cell-selection", true)
                            .classed("cell-selected", true);

                        d3.select(".r" + (cell_d.row - 1))
                            .classed("text-selection", true)
                            .classed("text-selected", true);

                        d3.select(".c" + (cell_d.col - 1))
                            .classed("text-selection", true)
                            .classed("text-selected", true);
                    }
                });
            }
        })
        .on("mouseup", function () {
            // remove selection frame
            sa.selectAll("rect.selection").remove();

            // remove temporary selection marker class
            d3.selectAll('.cell-selection').classed("cell-selection", false);
            d3.selectAll(".text-selection").classed("text-selection", false);
        })
        .on("mouseout", function () {
            if (d3.event.relatedTarget.tagName == 'html') {
                // remove selection frame
                sa.selectAll("rect.selection").remove();
                // remove temporary selection marker class
                d3.selectAll('.cell-selection').classed("cell-selection", false);
                d3.selectAll(".rowLabel").classed("text-selected", false);
                d3.selectAll(".colLabel").classed("text-selected", false);
            }
        });
*/
    
    callGenomeGraph = function(coordinate) {
        Session.set('coordinate', coordinate);
        Router.go('/gg');
    }


    
    

});

Template.Heatmap.helpers({
    /*'getWidth' : function() {
        var col_number = 60, cellSize = 12, left = 300, right = 10;

        return (cellSize * col_number) + left + right + 100;
    },

    'getHeight' : function() {
        var row_number = 50, cellSize = 12, top = 150, bottom = 50;

        return (cellSize * col_number) + top + bottom + 100;
    }
    ,*/
    browserReady: function () { 
        return Session.get('isBrowserReady')
    }

});

