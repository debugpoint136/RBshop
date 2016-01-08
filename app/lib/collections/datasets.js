/* ============================== */
/*            Datasets            */
/* ============================== */

Datasets = new Mongo.Collection('datasets');

Datasets.attachSchema(new SimpleSchema({
    name: {
        type: String,
        max: 100
    },

    label: {
        type: String,
        max: 100
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
    userId: {
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
    url: {
        type: String,
        max: 100,
        optional: true
    }
}));

/*if (Meteor.isServer) {
    Datasets.allow({
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
