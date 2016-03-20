var chrLst = ["chr1", "chr2", "chr3", "chr4", "chr5", "chr6", "chr7", "chr8", "chr9", "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr20", "chr21", "chr22", "chrX", "chrY"];

Template.slider.onRendered(function () {
    var data = Session.get('chr2data');
    var minv = Session.get('minv');
    var maxv = Session.get('maxv');

    var resData = [];
    Object.keys(data).forEach(function(chr){
        data[chr].forEach(function(d){
            resData.push(d[4]);
        });
    });

    data = resData;

    var margin = {top: 14, right: 50, bottom: 24, left: 50},
        width = 960 - margin.left - margin.right,
        height = 70 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain([minv, maxv])
        .range([0, width]);

    var y = d3.random.normal(height / 2, height / 8);

    var brush = d3.svg.brush()
        .x(x)
        .extent([.3, .5])
        .on("brushstart", brushstart)
        .on("brush", brushmove)
        .on("brushend", brushend);

    var arc = d3.svg.arc()
        .outerRadius(height / 2)
        .startAngle(0)
        .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });

    var svg = d3.select("#sliderHandle").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

    var circle = svg.append("g").selectAll("circle")
        .data(data)
      .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + x(d) + "," + y() + ")"; })
        .attr("r", 3.5);

    var brushg = svg.append("g")
        .attr("class", "brush")
        .call(brush);

    brushg.selectAll(".resize").append("path")
        .attr("transform", "translate(0," +  height / 2 + ")")
        .attr("d", arc);

    brushg.selectAll("rect")
        .attr("height", height);

    brushstart();
    brushmove();

    function brushstart() {
      svg.classed("selecting", true);
    }

    function brushmove() {
      var s = brush.extent();
      Session.set('selectedbySlider', s);
      circle.classed("selectedNeg", function(d) { return s[0] <= d && d < 0 && d <= s[1]; }); 
      circle.classed("selectedPos", function(d) { return s[0] <= d && 0 < d && d <= s[1]; }); 
      circle.classed("selectedZero", function(d) { return s[0] <= d && 0 == d && d <= s[1]; }); 
        if ( s[0] != 0.3 || s[1] != 0.5) {
            d3.select('#wait')
                .classed("hidden", false);
        }
    }

    function brushend() {
      svg.classed("selecting", !d3.event.target.empty());

      
      var s = brush.extent();
      if ( s[0] != 0.3 || s[1] != 0.5) {

        // var totalSelectedCount = 0;
        // var negElements = d3.selectAll('.selectedNeg').size(),
        //     posElements = d3.selectAll('.selectedPos').size(),
        //     zeroElements = d3.selectAll('.selectedZero').size();
    
        //     totalSelectedCount = negElements + posElements + zeroElements;

        //     if ( totalSelectedCount ) {
        //         if ( totalSelectedCount > 1000 ) {
        //             $.blockUI({ message: null }); 
        //             setTimeout($.unblockUI, totalSelectedCount * 4 );
        //         } 
        //     }

            draw_genomebev_experiment();
        }
    }
});