// format data array to make it work with d3.svg.area()
formatData = function(data) {
  var dataPoints = [];
    data.forEach(function(d, i) {
      var tmp = {};
      tmp.position = i;
      tmp.signal = d;

      dataPoints.push(tmp);
    });

  return dataPoints;
}