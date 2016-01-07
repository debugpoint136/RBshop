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

    toPrint = Datasets.find({}, { limit : 50 });

    toPrint.forEach(function(obj, index) {
        _(obj).each(function(elem, key){
          /*console.log(elem);
          console.log(key);*/
          //obj[key] = _(elem).values();
          obj[key] = elem;
        });
        //console.log(_.toArray(obj).join("\t")); 
    });

    return toPrint;
});

Meteor.publish('testsubfam', function () {
    return Subfam.find({}, { limit: 60 });
});

//Meteor.publish('ratioforDatasets', function (datasetList) {
//    return Ratio.find({
//        datasetId: {
//            $in: datasetList
//        }
//    });
//});
