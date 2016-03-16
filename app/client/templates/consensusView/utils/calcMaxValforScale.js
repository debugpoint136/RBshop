calcMaxValforScale = function(data) {

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
  return maxValforScale;
}