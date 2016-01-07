SubfamFragments = new Mongo.Collection('subfamfragments');

SubfamFragments.attachSchema(new SimpleSchema({
    /*select * from subfam2fragment(needs to be standalone collection)
    130     chr1    30952   31131   741     +
        chrom: "chr1", start: "30952", stop: "31131", swScore: "741", strand: "+"
        stop
        swScore
        strand
        -- - {
        chrom
        start
        stop
        swScore
        strand
    }*/

    subfamid: {
        type: String,
        max: 100
    },
    chrom: {
        type: String,
        max: 10
    },
    start: {
        type: String,
        max: 10
    },
    stop: {
        type: String,
        max: 10
    },
    swScore: {
        type: String,
        max: 10
    },
    strand: {
        type: String,
        max: 10
    }
}));