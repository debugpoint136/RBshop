Ratio = new Mongo.Collection('ratio');


Ratio.attachSchema(new SimpleSchema({
    datasetId: {
        type: String,
        max: 100
    },

    subfamId: {
        type: String,
        max: 100
    },

    ratioAll: {
        type: String,
        max: 100
    },

    ratioUniq: {
        type: String,
        max: 100
    }
}));