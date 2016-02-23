/*****************************************************************************/
/* Density: Event Handlers */
/*****************************************************************************/
Template.Density.events({
});

/*****************************************************************************/
/* Density: Helpers */
/*****************************************************************************/
Template.Density.helpers({
    densityChart: function () {
        var trackSet = Template.instance().data;

        Meteor.defer(function() {
            // Create standard Highcharts chart with options:
            Highcharts.chart('density', {
                series: [{
                    type: 'area',
                    data: trackSet
                }],
                chart: {
                    spacingTop: 80,
                    height: 250,
                    spacingBottom: 80
                },
                xAxis: {
                    title: {
                        text: 'Consensus Length'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Read Coverage'
                    }
                },
                title: {
                    text: ''
                }
            });
        });
    }
});

/*****************************************************************************/
/* Density: Lifecycle Hooks */
/*****************************************************************************/
Template.Density.onCreated(function () {
});

Template.Density.onRendered(function () {
});

Template.Density.onDestroyed(function () {
});
