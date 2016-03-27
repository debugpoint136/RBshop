order = function(value, props) {
    var svg = d3.select("#main svg");
    var hccol = props.hccol,
        hcrow = props.hcrow,
        cellSize = props.hcrow;
    
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