/*****************************************************************************/
/* select_dataset: Event Handlers */
/*****************************************************************************/
Template.select_dataset.events({
    'submit .handle-select-datafile-submit': function (event) {
        var data = event.target.dataselect.value;
        var str = range(1, 5);
        console.log(data);
        Session.set('dataSelected', str);
        console.log('ok..will try setting the session variable to : ' + str);

        // Prevent Submit
        return false;
    },
});

/*****************************************************************************/
/* select_dataset: Helpers */
/*****************************************************************************/
Template.select_dataset.helpers({

});

/*****************************************************************************/
/* select_dataset: Lifecycle Hooks */
/*****************************************************************************/
Template.select_dataset.onCreated(function () {
});

Template.select_dataset.onRendered(function () {
});

Template.select_dataset.onDestroyed(function () {
});

/*****************************************************************************/
/* select_dataset: generic functions */
/*****************************************************************************/

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i.toString());
    }
    return foo;
}