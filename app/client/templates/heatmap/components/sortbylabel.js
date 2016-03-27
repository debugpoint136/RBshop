/*========== Change ordering of cells ===========*/

sortbylabel = function(rORc, i, sortOrder, props) {
    var svg = d3.select("#main");
    var t = svg.transition().duration(3000);
    var log2r = [];
    var sorted; // sorted is zero-based index

    var cellSize = props.cellSize,
        row_number = props.rows,
        col_number = props.cols;

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
    } else if (rORc == "sfCFS"){
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

    }  else if (rORc == "ySample") {
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