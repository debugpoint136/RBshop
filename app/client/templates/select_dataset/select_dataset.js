/*****GLOBAL VARIABLES*****/
baseDir = "/edcc";
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

/* this is what we want */
// {
//   "cell_type": 453,
//   "assay": 10,
//   "institution": 5,
//   "donorID": "7",
//   "sampleID": "SRS120882_7",
//   "species": "human",
//   "in_fullref": "0",
//   "track": [{"view": "signal", "track_name": "AN_H3K27ac_7_64", "id": 30108, "format": "bigWig", "metadata": {}}]
// },

// 1. pick sample name
// 2. pick sample id from samples JSON
// 3. Replace space with _
// 4. Query that string in cell types JSON
// 5. Pick Assay id
// 6. Query that in Assay JSON
// 7.   

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
    // callAPI('httpGETcall', geoURLroadmap,  geoFlatROADMAP );

    setTimeout(doneLoading, 1000);
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

var sampleList =  [];

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
    } /* for loop end */

    Meteor.call('httpGETcall', geoURLencode, function(error, res) {
      if (!error) {
            var data = eval('(' + res + ')');
            console.log("======printing encode data ======");
            var geoH3K27ac = [];
            data.forEach(function(d) {
                if (d.geo) {
                  var geo = d.geo[0];
                  // Re-format the objects 
                    if (geo2id[geo]) {   
                        // console.log(d.name);
                        if ( d.name.search(/H3K27ac/i) != -1) {
                            console.log(d.name);
                            geoH3K27ac.push(geo);
                        }
                        sampleList.push(d.metadata.Sample);
                    }
                }   
            });
            var uniqueSampleList = geoH3K27ac.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
            console.log(uniqueSampleList.join('","'));
      }
      
    }); /* geoURLencode end */

    Meteor.call('httpGETcall', geoURLroadmap, function(error, res) {
      if (!error) {
            var data = eval('(' + res + ')');
            data.forEach(function(d) {
                if (d.geo) {
                  var geoName = d.geo[0];
                  // Re-format the objects 
                    if (geo2id[geoName]) {
                        sampleList.push(d.metadata.Sample);
                    }
                }   
            });
      }
      var uniqueSampleList = sampleList.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
      sampleListToId(uniqueSampleList);
    }); /* geoURLencode end */
} /* bootstrapGEO end */


function sampleListToId(arr) {
    Meteor.call('httpGETcall', samplesURL, function(error, res) {
      if (!error) {
            var sampleJSONparsed = eval('(' + res + ')');
            processSampleJSON(sampleJSONparsed, arr);
      } 
    });  
}


function processSampleJSON(parsedSampleJSON, sampleList) {

    var takeStock = [];
    sampleList.forEach(function(a) {
        if (parsedSampleJSON.terms[a][0]) {
            takeStock.push(parsedSampleJSON.terms[a][0].replace(/ /g,"_"));
        }
    });
    cellTypeProcess(takeStock);
}

function cellTypeProcess(arr) {

    var cell_type_formatted = {};
    d3.json('/json/cell_types.json', function(err, res) {
        if (! err ) {
            var cell_type_arr = res.cell_type;

            cell_type_arr.forEach(function(d) {
                cell_type_formatted[d.name] = d.id;
            });
        } 
        var listOfCellTypes = [];
        arr.forEach(function(a) {
            if (cell_type_formatted[a]) {
                listOfCellTypes.push(cell_type_formatted[a]);
            } else if (cell_type_formatted[a.toLowerCase()]) {
                listOfCellTypes.push(cell_type_formatted[a.toLowerCase()]);
            } 
        });

    extractDatasets(listOfCellTypes);
    });
}

function extractDatasets(arr) {
    d3.json('/json/roadmap_encode.json', function(err, res) {
        if (! err ) {
            var ihec_encode_rmJSON = res.dataset;

            var saveList = {};
            var toReturn = [];

            ihec_encode_rmJSON.forEach(function(d) {
                saveList[d.cell_type] = d;
            });

            arr.forEach(function(i) {
                if ( saveList[i] ) {
                    toReturn.push(saveList[i]);
                } 
            });

            // console.log(JSON.stringify(toReturn));
        } 
    });
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

// var samplesJSONobj = {};
// Meteor.call('httpGETcall', samplesURL, function(error, res) {
//       if (!error) {
//             var data = eval('(' + res + ')');
//       } else {
//         console.log(error);
//       }

//     var cell_type_formatted = {};

//     d3.json('/json/cell_types.json', function(err, res) {
//         if (! err ) {
//             var cell_type_arr = res.cell_type;

//             cell_type_arr.forEach(function(d) {
                
//                 cell_type_formatted[d.name] = d.id;
                
//             });
//         } 
//     });

// // GSM605625: Array[6]
// // 0: Object
// // detail_url: "http://vizhub.wustl.edu/tD/hg19/GSM605625_2"
// // metadata: Object
// // Assay: "25002"
// // Institution: "30006"
// // Sample: "13047"

//     geoFlatENCODE.forEach(function(d) {
//         console.log(d[0].metadata.Sample);
//     });

//     // console.dir(Object.keys(samplesJSONobj.cell_type).length);
//     console.log(Object.keys(data.terms).length);
//     console.dir(cell_type_formatted);

// });

// Object.keys(geo2id).forEach(function(geo) {
    // if (geoFlatENCODE(geo)) {
    //     console.log(geoFlatENCODE[geo].metadata.Sample);
    // } else if (geoFlatROADMAP(geo)) {
    //     console.log(geoFlatROADMAP[geo].metadata.Sample);
    // }
//     console.log(geo);
// });

