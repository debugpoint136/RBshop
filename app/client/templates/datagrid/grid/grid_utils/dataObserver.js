dataObserver = function() {

    Tracker.autorun(function() {
        var samplePins = [];
        var sampleList = Session.get('tissuesSelected');
        var rowLabels = [];

        sampleList.forEach(function(s) {
            samplePins.push(SampleRows[s]);
            rowLabels.push(s);
        });
        // makeDataframe(samplePins, rowLabels);
    });
}