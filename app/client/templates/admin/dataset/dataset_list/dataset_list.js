/*****************************************************************************/
/* DatasetList: Event Handlers */
/*****************************************************************************/
Template.DatasetList.events({
    'click .delete_dataset': function (event) {
        if (confirm("Are you sure?")) { // TODO : try moving this to toastr style
            Datasets.remove(this._id);
            toastr.success("Dataset Deleted");
            // Prevent Submit
            return false;
        }
    },
    'click .datafile_add': function (event) {
        Modal.show('DatafileAdd');
        Session.set({
            datasetId: this._id
        });
    }
});

/*****************************************************************************/
/* DatasetList: Helpers */
/*****************************************************************************/
Template.DatasetList.helpers({
    datasets: function () {
        return Datasets.find();
    }
});

/*****************************************************************************/
/* DatasetList: Lifecycle Hooks */
/*****************************************************************************/
Template.DatasetList.onCreated(function () {
    this.subscribe('datasets', Meteor.userId());
});

Template.DatasetList.onRendered(function () {});

Template.DatasetList.onDestroyed(function () {});