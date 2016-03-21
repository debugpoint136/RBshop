rankRepeatsByAssayVal = function() {
    var tosort=[];
    var bevData = Session.get('chr2data');
    

    for(var chr in bevData) {
        var lst = bevData[chr];
        for( i = 0; i < lst.length; i++ )
            tosort.push( [ chr, i, lst[i][4] ] );
        /* 0: chr, 1: in-chr array idx, 2: data
         */
    }
    
    tosort.sort(scoreSort);
    // var _r=vobj.rank;
    // _r.rarr=tosort;
    sortedRepByAssayVal = tosort;
    beam_rankitem(bevData);
}