Meteor.publish('datasets', function (userId) {
    return Datasets.find({
        userId: userId
    });
});

Meteor.publish('datafiles', function (datasetID) {
    return Datafiles.find({
        datasetId: datasetID
    });
});

Meteor.publish('subfam', function () {
    return Subfam.find();
});

Meteor.publish('subfamfragments', function (subfamID) {
    return SubfamFragments.find({
        subfamid: subfamID
    }, { limit: 200 });
});

//Meteor.publish('ratio', function (datasetID) {
//    return Ratio.find({
//        datasetId: datasetID
//    });
//});

Meteor.publish('datafile', function (id) {
    return Datafiles.find({
        _id: id
    });
});

var datasetsList = ["GSM733660","GSM733662","GSM1003578","GSM733656","GSM733739","GSM733763","GSM733755","GSM733646","GSM733691","GSM733718","GSM945854","GSM733666","GSM1003493","GSM733771","GSM733674","GSM945853","GSM818826","GSM1003462","GSM733684","GSM733743"];

Meteor.publish('testdatasets', function () {
    // return Datasets.find({ name: { $in: datasetsList }});
    // datasets = "GSM733660,GSM733662,GSM1003578,GSM733656";
    // var dataids = datasets.split(",");
    // "GSM733739","GSM733763","GSM733755","GSM733646","GSM733691","GSM733718","GSM945854","GSM733666","GSM1003493","GSM733771","GSM733674","GSM945853","GSM818826","GSM1003462","GSM733684","GSM733743"]}});
    // return Datasets.find({});
     return Datasets.find({}, { limit : 100 });
    // return Datasets.find({'label': { $regex: /STAT/i} });
    // return Datasets.find({'label': { $in: [ /STAT1/,  /IRF1/, /H3K27ac/, /CD14/]} });
    //return Datasets.find({ name: { $in: ["GSM733660","GSM733662","GSM1003578","GSM733656","GSM733739","GSM733763","GSM733755","GSM733646","GSM733691","GSM733718","GSM945854","GSM733666","GSM1003493","GSM733771","GSM733674","GSM945853","GSM818826","GSM1003462","GSM733684","GSM733743"]} });
    // return Datasets.find({ name : { $in: ["GSM1010742", "GSM803476"]
    //     ["GSM733660","GSM733662","GSM1003578","GSM733656","GSM733739","GSM733763","GSM733755","GSM733646","GSM733691","GSM733718","GSM945854","GSM733666","GSM1003493","GSM733771","GSM733674","GSM945853","GSM818826","GSM1003462","GSM733684","GSM733743"]
    // }});
});

var subfamList = ["LTR13", "MER107", "LTR12F", "MER51B",
        "LTR19B", "MER41B", "THE1C", "MER57B1", "MER51A", "MER41E", "LTR26", "MER44A",
        "LTR47A", "MER57B2", "MSTB1", "L1MB2", "LTR8B", "Tigger7", "MER44B",
        "MER45B", "MER77", "LTR41", "LTR50", "LTR41B", "MLT1J", "MLT1L", "AmnSINE1"
];
Meteor.publish('testsubfam', function () {
    return Subfam.find({}, { limit : 100 , sort : { family: 1}});
    //return Subfam.find({'name': { $regex: /MER41/} });
    // return Subfam.find({ name: { $in: testList }});
});

Meteor.publish('fetchDatasetId', function(coordinate) {
    return Datasets.find({ label: coordinate[0]});
})


//Meteor.publish('ratioforDatasets', function (datasetList) {
//    return Ratio.find({
//        datasetId: {
//            $in: datasetList
//        }
//    });
//});

/*
["LTR13", "MER107", "LTR12F", "MER51B",
        "LTR19B", "MER41B", "THE1C", "MER57B1", "MER51A", "MER41E", "LTR26", "MER44A",
        "LTR47A", "MER57B2", "MSTB1", "L1MB2", "LTR8B", "Tigger7", "MER44B",
        "MER45B", "MER77", "LTR41", "LTR50", "LTR41B", "MLT1J", "MLT1L", "AmnSINE1"
]
*/

// [
//         "MER107", "MER41E", "LTR12F", "MER51B",
//         "LTR19B", "MER41B", "MER57B1", "MER51A", 
//          "MER44A","MER57B2", "MER44B","MER45B"
//         ]
