if (Meteor.isServer) {
    Meteor.startup(function () {

        /*==BELOW ARE WORKING EXAMPLES - CAN BE USED AS SNIPPETS==*/
        /*if (Subfam.find().count() == 0) {
    Subfam.insert({
        name: 'L2A',
        id: '166',
        genomelength: '47834623',
        family: 'L2',
        subfamclass: 'SINE',
        consensuslength: '283',
        copycount: '171064',
        sequence: 'gtctactgccataccaccctgaacacgcccgatctcatctgatcttggaagctaagcagggtcaggcctggttggtacctgatgggagagagcctgggaacaccgggttctgtagggttg',
        userId: 'buPsywrun4n2b5cDu',
        updatedAt: new Date()
    })
}*/

        /*
        if (SubfamFragments.find().count() == 0) {
            SubfamFragments.insert({
                chrom: "chr1",
                start: "30952",
                stop: "31131",
                swScore: "741",
                strand: "+",
                subfamid: "1"
            });
        }
        */
    });
}