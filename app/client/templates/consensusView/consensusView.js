Template.consensusView.events({
    'click .jsShowInfo': function (event) {
        // grab the identifier from name attr of button
        var banner = event.target.name;
        fetchInfo(banner, function(row){
          Session.set('sesnFetchInfo', row);
          Modal.show("showInfo");
        });

        // Modal.show("showInfo");
        return false;
    },
    'click .gv': function(e) {
        $.blockUI({ message: null });
        setTimeout($.unblockUI, 5000);
    }
}); // end Template events


Template.consensusView.onRendered(function () {
  
  // var coordinate = ['GSM935360', 'MER41B'];
  var coordinate = Session.get('coordinate');

  d3.select('#dataset')
    .text(coordinate[0]);

  d3.select('#subfam')
    .text(coordinate[1]);

 	Meteor.call("retrieveMedia", coordinate, function(error, res) {
      if (!error) {
            var data = cleanUp(res);
    		    // constructGraphs(data);
            makeCharts(data);
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
      width = 1160 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
		
    var svg = d3.select("#artboard").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height / 1.5 + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  if (dataToDraw[0]) {
    drawArea(svg, dataToDraw[0].bwa, 'rgba(4, 68, 129, 0.75)', datasetName, maxValforScale);
    drawArea(svg, dataToDraw[0].itrs, 'rgba(188, 224, 251, 0.75)', datasetName, maxValforScale);
  }
}
    function drawArea(svg, data, fillColor, datasetName, maxValforScale) {

      var margin = {top: 20, right: 20, bottom: 30, left: 80},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height / 2, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var area = d3.svg.area()
          .x(function(d) { return x(d.position); })
          .y0(height/2)
          .y1(function(d) { return y(d.signal); });

      x.domain(d3.extent(data, function(d) { return d.position; }));
      y.domain([ 0, maxValforScale ]);
    
      svg.append("text")
          .attr('class', 'heading')
          .text(datasetName);

      svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area)
          .attr('fill', fillColor);

      svg.append("g")
          .attr("class", "x axis axisText")
          .attr("transform", "translate(0," + height / 2 + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis axisText")
          .call(yAxis);

          makeHCGraphs();
    }





//#####################################################################


function fetchInfo(banner, cb) {
    var urlString = 'http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?repeatbrowser%3Don%26getfileinfo%3D' + banner + '%26rpbrDbname%3Dhg19repeat';
    Meteor.call('httpGETcall', urlString, function(err, res) {
      var details = eval('(' + res + ')');

      var returnObj = [];

      var detailsText = details.text.split(';');
      detailsText.forEach(function(d){
        var splitByEqual = d.split('=');

        returnObj.push( {
          'name' : splitByEqual[0],
          'val'  : splitByEqual[1]
        } );
      });
      cb(returnObj);
    });
}


  