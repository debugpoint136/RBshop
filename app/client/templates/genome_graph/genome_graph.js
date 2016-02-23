/*****************************************************************************/
/* GenomeGraph: Event Handlers */
/*****************************************************************************/

  Template.GenomeGraph.events({});

  /*****************************************************************************/
  /* GenomeGraph: Helpers */
  /*****************************************************************************/
  Template.GenomeGraph.helpers({
    graphData: function () {
      var self = Template.instance();
      var cleanedUp = cleanUp(self.resources.get());
      //console.log(cleanedUp);
      cleanDataReceived = getTreatmentNames(cleanedUp.density);

      //console.log(cleanDataReceived);

      //console.log(cleanDataReceived);
      cleanDataReceived.forEach(function(item) {
//        console.log(item);
//        console.log(item.name);
//        console.log('--------');
//
//          console.log('========BWA==========');
//          console.log(item.value[1].bwa.join(','));

//        console.log(type);
//        console.log('name: ' + type);
//        console.log('==================');
//        console.log(item.value[type]);
//        console.log('==================');
        //displayData[type] = item.value[type];
      })

      return cleanedUp;
    },
    treatmentChart: function (){
      //dataReceived = Template.instance().data;
      dataReceived = getTreatmentNames(graphData.treatment);
      displayData = {};


      dataReceived.value.forEach(function(item) {
        var type = Object.keys(item);
        displayData[type] = item[type];
      })



      Meteor.defer(function() {
        // Create standard Highcharts chart with options:
        Highcharts.chart(dataReceived.name, {
          series: [
            {
              type: 'area',
              name: 'BWA',
              data: displayData.bwa
            },
            {
              type: 'area',
              name: 'Iteres',
              data: displayData.iteres
            }
          ]
        });
      });
    }
  });

  /*****************************************************************************/
  /* GenomeGraph: Lifecycle Hooks */
  /*****************************************************************************/
  Template.GenomeGraph.onCreated(function () {
    var coordinate = Session.get('coordinate');

    var self = this;
    self.resources = new ReactiveVar(null);
    Meteor.call("retrieveMedia",coordinate, function(error, r) {
      if (!error) {
        self.resources.set(r);
      } else {
        console.log(error);
      }
    });
  });

  Template.GenomeGraph.onRendered(function () {

  });

  Template.GenomeGraph.onDestroyed(function () {
  });

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


function getTreatmentNames(req) {
  var keys = [];
  for (var key in req) {
    if (req.hasOwnProperty(key)) {
      data={}
      data['name'] = key;
      data['value'] = req[key];
      keys.push(data);
    }
  }
  return keys;
}
