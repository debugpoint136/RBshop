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

  // REFACTOR : setting up session id for genome view integration with main browser

  var forSession = {
    'treatment': [],
    'input': []
  };

  Object.keys(cleanedUp.treatment).forEach(function(trt) {
    forSession.treatment.push(trt);
  });

  if (cleanedUp.input) {
    Object.keys(cleanedUp.input).forEach(function(inp) {
      forSession.input.push(inp);
    });
  }

  /* SESSION */
  Session.set('ssnCreateWURBlink', forSession);
  return cleanedUp;
}