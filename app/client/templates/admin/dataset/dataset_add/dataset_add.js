/*****************************************************************************/
/* DatasetAdd: Event Handlers */
/*****************************************************************************/
Template.DatasetAdd.events({
    'submit .add_dataset_form': function (event) {
        event.preventDefault;
        var name = event.target.name.value;
        var label = event.target.label.value;
        var type = event.target.type.value;
        var projectDate = event.target.projectDate.value;

        // Insert Post
        Datasets.insert({
            name: name,
            label: label,
            type: type,
            projectDate: projectDate,

        }, function (error, result) {
            if (error) {
                toastr.error('There was an issue adding this dataset');
            } else {
                Session.set({
                    'datasetId': result
                });
                toastr.success("Dataset Added");
                Router.go('/admin/datasets');
                Modal.show('DatafileAdd');
            }
        });

        // Prevent Submit
        return false;
    }
});

/*****************************************************************************/
/* DatasetAdd: Helpers */
/*****************************************************************************/
Template.DatasetAdd.helpers({});

/*****************************************************************************/
/* DatasetAdd: Lifecycle Hooks */
/*****************************************************************************/
Template.DatasetAdd.onCreated(function () {});

Template.DatasetAdd.onRendered(function () {
    this.$('.datetimepicker').datetimepicker();
});

Template.DatasetAdd.onDestroyed(function () {});