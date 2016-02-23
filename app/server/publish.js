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

Meteor.publish('testdatasets', function () {

    return Datasets.find({}, { limit : 50 });
    //return Datasets.find({'label': { $regex: /STAT/} });
});

Meteor.publish('testsubfam', function () {
    return Subfam.find({}, { limit : 60 , sort : { family: 1}});
    //return Subfam.find({'name': { $regex: /MER41/} });

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
