/*****************************************************************************/
/* DatasetEdit: Event Handlers */
/*****************************************************************************/
Template.DatasetEdit.events({
    'click .datafile_add': function (event) {
        Modal.show('DatafileAdd');
        Session.set({
            datasetId: this._id
        });
        return false;
    },
    'submit .edit_dataset_form': function (event) {
        var name = event.target.name.value;
        var label = event.target.label.value;
        var type = event.target.type.value;
        var projectDate = event.target.projectDate.value;
        var ratio_uniq = event.target.ratio_uniq.value;
        var ratio_all = event.target.ratio_all.value;

        // Update Dataset
        Datasets.update({
            _id: this._id
        }, {
            $set: {
                name: name,
                label: label,
                type: type,
                projectDate: projectDate,
                ratio_uniq: ratio_uniq,
                ratio_all: ratio_all
            }
        });

        toastr.success("Dataset Updated");
        Router.go('/admin/datasets');

        // Prevent Submit
        return false;
    },

    'click .delete_datafile': function (event) {
        if (confirm("Are you sure?")) { // TODO : try moving this to toastr style
            Datafiles.remove(this._id);
            toastr.success("Datafile Deleted");
            // Prevent Submit
            return false;
        }
    }
});

/*****************************************************************************/
/* DatasetEdit: Helpers */
/*****************************************************************************/
Template.DatasetEdit.helpers({
    datafiles: function () {
        var datasetID = this._id
        return Datafiles.find({
            datasetId: datasetID
        }, {
            sort: {
                type: -1
            }
        });
    }
});

/*****************************************************************************/
/* DatasetEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.DatasetEdit.onCreated(function () {
    this.subscribe('datasets', Meteor.userId());
});

Template.DatasetEdit.onRendered(function () {
    this.$('.datetimepicker').datetimepicker();
});

Template.DatasetEdit.onDestroyed(function () {});