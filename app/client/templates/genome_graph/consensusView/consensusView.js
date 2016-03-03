Template.consensusView.onRendered(function () {

  
  // var coordinate = ['GSM935360', 'MER41B'];
  var coordinate = Session.get('coordinate');

  console.log(coordinate);
 	Meteor.call("retrieveMedia", coordinate, function(error, res) {
      if (!error) {
            var data = cleanUp(res);
    		    constructGraphs(data);
      } else {
        console.log(error);
      }
    });

}); // end Template onRendered

//#####################################################################

function constructGraphs(data) {

 var maxValues = [],
     dataToDrawTreatment = {},
     dataToDrawInput = {};

  Object.keys(data.treatment).forEach(function(key) {

    if (! dataToDrawTreatment[key]) {
      dataToDrawTreatment[key] = [];
    }
    
    dataToDrawTreatment[key].push({
                                   'bwa' : formatData(data.treatment[key][1].bwa),
                                   'itrs' : formatData(data.treatment[key][0].iteres)
                                 });

    maxValues.push(d3.max(data.treatment[key][1].bwa));
    maxValues.push(d3.max(data.treatment[key][0].iteres));
  });

    // check if input is available
  if (data.input) {
      Object.keys(data.input).forEach(function(key) {
        if (! dataToDrawInput[key]) {
          dataToDrawInput[key] = [];
        }

        dataToDrawInput[key].push({ 
                                  'bwa': formatData(data.input[key][1].bwa),
                                  'itrs': formatData(data.input[key][0].iteres)
                                 });

        maxValues.push(d3.max(data.input[key][1].bwa));
        maxValues.push(d3.max(data.input[key][0].iteres));
      });
        
  }

  var maxValforScale = d3.max(maxValues);

  Object.keys(dataToDrawTreatment).forEach(function(key){
    drawContent(dataToDrawTreatment[key], maxValforScale, key);
  });

  if (data.input) {
    Object.keys(dataToDrawInput).forEach(function(key){
      drawContent(dataToDrawInput[key], maxValforScale, key);
    });
  }
  
}

	function drawContent(dataToDraw, maxValforScale, datasetName) {

    var margin = {top: 20, right: 20, bottom: 30, left: 80},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
		
    var svg = d3.select("#artboard").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  if (dataToDraw[0]) {
    drawArea(svg, dataToDraw[0].bwa, '#843c39', datasetName, maxValforScale);
    drawArea(svg, dataToDraw[0].itrs, '#e7969c', datasetName, maxValforScale);
  }
}
    function drawArea(svg, data, fillColor, datasetName, maxValforScale) {

      var margin = {top: 20, right: 20, bottom: 30, left: 80},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var area = d3.svg.area()
          .x(function(d) { return x(d.position); })
          .y0(height)
          .y1(function(d) { return y(d.signal); });

      x.domain(d3.extent(data, function(d) { return d.position; }));
      y.domain([0, maxValforScale]);
    
      svg.append("text")
          .attr('class', 'heading')
          .text(datasetName);

      svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area)
          .attr('fill', fillColor);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
    }





//#####################################################################

function cleanUp(req) {
    var data = eval('(' + req + ')');

    var cleanedUp = {};
    var treatment_all = data.treatment_all;
    var treatment_unique = data.treatment_unique;
    var input_all = data.input_all;
    var input_unique = data.input_unique;
    var density = data.density;
    var consensusseq = data.consensusseq;

    var tmp_treatment = {};
    var tmp_input = {};

    treatment_unique.forEach(function(item) {
      var tmp = {};
      tmp['iteres'] = item[1];
      if (! tmp_treatment[item[0]]) {
        tmp_treatment[item[0]] = [];
      }
      tmp_treatment[item[0]].push(tmp)
    });

    treatment_all.forEach(function(item) {
      var tmp = {};
      tmp['bwa'] = item[1];
      if (! tmp_treatment[item[0]]) {
        tmp_treatment[item[0]] = [];
      }
      tmp_treatment[item[0]].push(tmp)
    });

    if (input_all) {
      input_all.forEach(function(item) {
        var tmp = {};
        tmp['iteres'] = item[1];
        if (! tmp_input[item[0]]) {
          tmp_input[item[0]] = [];
        }
        tmp_input[item[0]].push(tmp)
      });
    }

    if (input_unique) {
      input_unique.forEach(function(item) {
        var tmp = {};
        tmp['bwa'] = item[1];
        if (! tmp_input[item[0]]) {
          tmp_input[item[0]] = [];
        }
        tmp_input[item[0]].push(tmp)
      });
    }

    cleanedUp['treatment'] = tmp_treatment;
    cleanedUp['input'] = tmp_input;
    cleanedUp['density'] = density;
    cleanedUp['consensusseq'] = consensusseq;

    return cleanedUp;
  }

  // format data array to make it work with d3.svg.area()
  function formatData(data) {
    var dataPoints = [];
      data.forEach(function(d, i) {
        var tmp = {};
        tmp.position = i;
        tmp.signal = d;

        dataPoints.push(tmp);
      });

    return dataPoints;
  }