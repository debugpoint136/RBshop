cleanUp = function(req) {
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