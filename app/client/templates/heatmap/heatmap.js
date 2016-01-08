/*****************************************************************************/
/* SubfamList: Helpers */
/*****************************************************************************/
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

});


/*****************************************************************************/
/* SubfamList: Lifecycle Hooks */
/*****************************************************************************/
Template.Heatmap.onCreated(function () {
});


Template.Heatmap.onRendered(function () {

    var margin = {top: 150, right: 10, bottom: 50, left: 300},
        cellSize = 12;



    // TODO: set this dynamically based on the datasets and subfamilies selected
    col_number = 60;
    row_number = 50;

    var data = []; // Adding this after disabling the previously laid out structure

    var dataRatio = [];
    var datasetNames = [];

    width = cellSize * col_number, // - margin.left - margin.right,
        height = cellSize * row_number , // - margin.top - margin.bottom,
        //gridSize = Math.floor(width / 24),
        legendElementWidth = cellSize * 2.5,
        colorBuckets = 21,
        //colors = ['#005824', '#1A693B', '#347B53', '#4F8D6B', '#699F83', '#83B09B', '#9EC2B3', '#B8D4CB', '#D2E6E3', '#EDF8FB', '#FFFFFF', '#F1EEF6', '#E6D3E1', '#DBB9CD', '#D19EB9', '#C684A4', '#BB6990', '#B14F7C', '#A63467', '#9B1A53', '#91003F'];
        colors = ['#FF0000', '#FF1717', '#FF2E2E', '#FF4545', '#FF5C5C', '#FF7373', '#FF8B8B', '#FFA2A2', '#FFB9B9', '#FFD0D0', '#FFFFFF', '#D0D0FF', '#B9B9FF', '#A2A2FF', '#8B8BFF', '#7373FF', '#5C5CFF', '#4545FF', '#2E2EFF', '#1717FF', '#0000FF'];  // '#FFE7E7', '#FFFFFF', '#E7E7FF'



    var hcrowStart = 1, hcrowEnd = row_number;
    var hccolStart = 1, hccolEnd = col_number;
    var hcrow = [], hccol = [];

    for (var i = hcrowStart; i <= hcrowEnd; i++) {
        hcrow.push(i);
    }

    for (var j = hccolStart; j <= hccolEnd; j++) {
        hccol.push(j);
    }

    // Pull data from mongo db
    var datasets = Datasets.find({});
    rowLabel = [];
    datasets.forEach(function(doc) {
        datasetNames.push(doc.name);
        rowLabel.push(doc.label);
        dataRatio.push(doc.ratio_uniq);
        }
    );

    var subfam = Subfam.find({});
    colLabel = [];
    subfam.forEach(function(doc) {
        colLabel.push(doc.name);
        }
    );

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

            var colorScale = d3.scale.quantile()
                .domain([-10, 0, 10])
                .range(colors);

            var svg = d3.select("#main").append("svg")
                .attr("width", width + margin.left + margin.right)  // Expanded the drawing canvas
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")// moved the brush
                ;
            var rowSortOrder = false;
            var colSortOrder = false;


            /*========== Row labels ===========*/

            var rowLabels = svg.append("g")
                .selectAll(".rowLabelg")
                .data(rowLabel)
                .enter()
                .append("text")
                .text(function (d) {
                    return d;
                })
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return hcrow.indexOf(i + 1) * cellSize;  // relative position of the row
                })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + cellSize / 1.25 + ")")
                .attr("class", function (d, i) {
                    return "rowLabel mono r" + i;
                })
                .on("mouseover", function (d) {
                    d3.select(this).classed("text-hover", true);
                })
                .on("mouseout", function (d) {
                    d3.select(this).classed("text-hover", false);
                })
                .on("click", function (d, i) {
                    rowSortOrder = !rowSortOrder;
                    sortbylabel("r", i, rowSortOrder);
                    d3.select("#order").property("selectedIndex", 3).node().focus();  // this selects the order drop-down to "by contrast name"
                    ;
                })
                ;

            /*========== Column labels ===========*/

            var colLabels = svg.append("g")
                .selectAll(".colLabelg")
                .data(colLabel)
                .enter()
                .append("text")
                .text(function (d) {
                    return d;
                })
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return hccol.indexOf(i + 1) * cellSize;
                })
                .style("text-anchor", "left")
                .attr("transform", "translate(" + cellSize / 1.25 + ",-6) rotate (-90)")
                .attr("class", function (d, i) {
                    return "colLabel mono c" + i;
                })
                .on("mouseover", function (d) {
                    d3.select(this).classed("text-hover", true);
                })
                .on("mouseout", function (d) {
                    d3.select(this).classed("text-hover", false);
                })
                .on("click", function (d, i) {
                    colSortOrder = !colSortOrder;
                    sortbylabel("c", i, colSortOrder);
                    d3.select("#order").property("selectedIndex", 4).node().focus();
                })
                ;

    /*========== heatmap ===========*/

    var heatMap;
    heatMap = svg.append("g").attr("class", "g3")
        .selectAll(".cellg")
        .data(data, function (d) {
            return d.row + ":" + d.col;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return hccol.indexOf(d.col) * cellSize;
        })
        .attr("y", function (d) {
            return hcrow.indexOf(d.row) * cellSize;
        })
        .attr("class", function (d) {
            return "cell cell-border cr" + (d.row - 1) + " cc" + (d.col - 1);
        })
        .attr("width", cellSize)
        .attr("height", cellSize)
        .style("fill", function (d) {
            return colorScale(d.value);
        })
        .on("click", function (d) {
            var rowtext = d3.select(".r" + (d.row - 1));

            // called function here that will create a genome graph view
            var coordinate = [];

            coordinate.push(datasetNames[d.row -1], colLabel[d.col - 1]);
            callGenomeGraph(coordinate);

            if (rowtext.classed("text-selected") == false) {
                rowtext.classed("text-selected", true);
            } else {
                rowtext.classed("text-selected", false);
            }
        })
        .on("mouseover", function (d) {
            //highlight text
            d3.select(this).classed("cell-hover", true);
            d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) {
                return ri == (d.row - 1);
            });
            d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) {
                return ci == (d.col - 1);
            });

            /*========== Tooltip ===========*/

            //Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px")
                .select("#experiment")
                //.text("labels:" + rowLabel[d.row - 1] + "," + colLabel[d.col - 1] + "\ndata:" + d.value + "\nrow-col-idx:" + d.col + "," + d.row + "\ncell-xy " + this.x.baseVal.value + ", " + this.y.baseVal.value);
                .text("Experiment:" + rowLabel[d.row - 1]);
            d3.select("#tooltip")
                .select("#repeat-subfamily")
                .text("Repeat Subfamily : " + colLabel[d.col - 1]);
            //"\ndata:" + d.value + "\nrow-col-idx:" + d.col + "," + d.row + "\ncell-xy " + this.x.baseVal.value + ", " + this.y.baseVal.value);
            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function () {
            d3.select(this).classed("cell-hover", false);
            d3.selectAll(".rowLabel").classed("text-highlight", false);
            d3.selectAll(".colLabel").classed("text-highlight", false);
            d3.select("#tooltip").classed("hidden", true);
        });

    // TODO : Drag and select should give option to zoom on on the selection
    // TODO : Pan and zoom, with reset,  on these line - http://bl.ocks.org/mbostock/7ec977c95910dd026812
    // TODO : Main wrapper/container should be fluid and responsive

    /*========== Legend ===========*/

            var legend = svg.selectAll(".legend")
                .data([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                .enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function (d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", height + (cellSize * 2))
                .attr("width", legendElementWidth)
                .attr("height", cellSize)
                .style("fill", function (d, i) {
                    return colors[i];
                });

            legend.append("text")
                .attr("class", "mono")
                .text(function (d) {
                    return d;
                })
                .attr("width", legendElementWidth)
                .attr("x", function (d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", height + (cellSize * 4));

    /*========== Change ordering of cells ===========*/

            function sortbylabel(rORc, i, sortOrder) {
                var t = svg.transition().duration(3000);
                var log2r = [];
                var sorted; // sorted is zero-based index
                d3.selectAll(".c" + rORc + i)
                    .filter(function (ce) {
                        log2r.push(ce.value);
                    })
                ;
                if (rORc == "r") { // sort log2ratio of a gene
                    sorted = d3.range(col_number).sort(function (a, b) {
                        if (sortOrder) {
                            return log2r[b] - log2r[a];
                        } else {
                            return log2r[a] - log2r[b];
                        }
                    });
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
                } else { // sort log2ratio of a contrast
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

