Datafiles = new Mongo.Collection('datafiles');

Datafiles.attachSchema(new SimpleSchema({

    name: {
        type: String,
        max: 100
    },
    label: {
        type: String,
        max: 500
    },
    metadata: {
        type: String,
        max: 5000
    },
    type: {
        type: String,
        max: 100
    },
    projectDate: {
        type: String,
        max: 100,
        optional: true
    },
    datasetId: {
        type: String,
        max: 100
    },
    addedBy: {
        type: String,
        autoValue: function () {
            return Meteor.userId()
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function () {
            return new Date()
        }
    },
    updatedBy: {
        type: String,
        autoValue: function () {
            return Meteor.userId()
        }
    },
    url: {
        type: String,
        max: 2000,
        optional: true

    },

    comments: {
        type: String,
        max: 2000,
        optional: true

    }
}));



/*if (Meteor.isServer) {
    Datafiles.allow({
        insert: function (userId, doc) {
            return false;
        },

        update: function (userId, doc, fieldNames, modifier) {
            return false;
        },

        remove: function (userId, doc) {
            return false;
        }
    });
}*/