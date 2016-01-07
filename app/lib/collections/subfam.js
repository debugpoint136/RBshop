Subfam = new Mongo.Collection('subfam');

Subfam.attachSchema(new SimpleSchema({
    /* what are fields - list them 
        name (subfam)
        id (legacy id)
        genomelength
        family
        class
        consensuslength
        copycount
        
        ---
        sequence (consider merging seq from subfam2seq)
        ---
    */

    name: {
        type: String,
        max: 100
    },
    id: {
        type: String,
        max: 10
    },
    genomelength: {
        type: String,
        max: 10
    },
    family: {
        type: String,
        max: 100
    },
    subfamclass: {
        type: String,
        max: 100,
        optional: true
    },
    consensuslength: {
        type: String,
        max: 10,
        optional: true
    },
    sequence: {
        type: String,
        max: 5000,
        optional: true
    },
    copycount: {
        type: String,
        max: 10,
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
    }
}));



/*if (Meteor.isServer) {
    Subfam.allow({
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