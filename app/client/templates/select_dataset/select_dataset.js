/*****GLOBAL VARIABLES*****/

geo2id = {};
id2geo = {};
geoFlatENCODE = {};
geoFlatROADMAP = {};

geoURLencode = 'http://vizhub.wustl.edu/public/hg19/encode.md';
geoURLroadmap = 'http://vizhub.wustl.edu/public/hg19/roadmap9_methylC.md';

expURLAssays = 'http://vizhub.wustl.edu/metadata/Experimental_assays';
donorURL     = 'http://vizhub.wustl.edu/metadata/human/Donor';
samplesURL   = 'http://vizhub.wustl.edu/metadata/human/Samples';
institutionsURL = 'http://vizhub.wustl.edu/metadata/Institutions';

/*****************************************************************************/
/* select_dataset: Event Handlers */
/*****************************************************************************/
Template.select_dataset.events({
    'submit .handle-select-datafile-submit': function (event) {
        var data = event.target.dataselect.value;
        var str = range(1, 5);
        console.log(data);
        Session.set('dataSelected', str);
        console.log('ok..will try setting the session variable to : ' + str);

        // Prevent Submit
        return false;
    },
});

/*****************************************************************************/
/* select_dataset: Helpers */
/*****************************************************************************/
Template.select_dataset.helpers({
    datapageReady: function () { 
        return Session.get('isDataGridReady')
    }
});

/*****************************************************************************/
/* select_dataset: Lifecycle Hooks */
/*****************************************************************************/
Template.select_dataset.onCreated(function () {
    Session.set('isDataGridReady', false);
    
    callAPIforGEO();
    setTimeout( callAPI('httpGETcall', geoURLencode, geoFlatENCODE ), 4000);
    callAPI('httpGETcall', geoURLroadmap,  geoFlatROADMAP );

    setTimeout(doneLoading, 4000);
});

Template.select_dataset.onRendered(function () {


    // Load completed
    
});

Template.select_dataset.onDestroyed(function () {
    Session.set('isDataGridReady', false);
});

/*****************************************************************************/
/* select_dataset: generic functions */
/*****************************************************************************/

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i.toString());
    }
    return foo;
}


function doneLoading(){
  Session.set('isDataGridReady', true);
}


/*==============Fetch globally required data=========*/

function callAPIforGEO() {
    Meteor.call('httpGETcall', function(error, res) {
      if (!error) {
            var data = eval('(' + res + ')');
            bootstrapGEO(data);
      } else {
        console.log(error);
      }
    });
}

function bootstrapGEO(data) {
    /* entire set of geo */
    for(i = 0; i < data.geo.length; i++ ) {
        var v = data.geo[i];
        // geo, id, label, treatFiles, inputFiles
        geo2id[v[0]] = v[1];
        id2geo[v[1]] = {
            acc:        v[0],
            label:      v[2],
            treatment:  v[3].split(','),
            input:(v[4].length == 0 ? null : v[4].split(','))
        };
    }
}


function callAPI(apiName, url, postProcess) {
    Meteor.call(apiName, url, function(error, res) {
      if (!error) {
            var data = eval('(' + res + ')');
            cleanUpGEO(data, postProcess);
      } else {
        console.log(error);
      }
    });
}


function cleanUpGEO(res, geoFlat) {
    res.forEach(function(d) {
        if (d.geo) {
          var geoName = d.geo[0];
          // Re-format the objects 
            var obj = {};

            obj['name'] = d.name;
            obj['detail_url'] = d.detail_url;
            obj['metadata'] = d.metadata;
            obj['type'] = d.type;
            obj['public'] = d.public;
            obj['url'] = d.url;

            // var metadata = d.name.split(' ');

            if (geoFlat[geoName]) {
              geoFlat[geoName].push(obj);
            } else {
              geoFlat[geoName] = [obj];
            }
        }   
    });
}