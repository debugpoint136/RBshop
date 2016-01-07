/*****************************************************************************/
/* DatafileAdd: Event Handlers */
/*****************************************************************************/
Template.DatafileAdd.events({
    'submit .add_datafile_form': function (event) {
        var datasetId = Session.get('datasetId');
        var name = event.target.name.value;
        var label = event.target.datafilelabel.value;
        var type = event.target.type.value;
        var projectDate = event.target.projectDate.value;
        var url = event.target.url.value;
        var metadata = event.target.metadata.value;

        console.log(datasetId);
        console.log(name);
        console.log('label : there should be some value after this - - - ' + label);
        console.log(type);
        console.log(projectDate);
        console.log(url);
        console.log(metadata);



        // Insert Post
        Datafiles.insert({
            name: name,
            label: label,
            type: type,
            projectDate: projectDate,
            url: url,
            metadata: metadata,
            datasetId: datasetId
        }, function (error, result) {
            if (error) {
                toastr.error('Error adding this datafile');
            } else {
                toastr.success("Datafile Added");
                Router.go('/admin/datasets');
                Modal.hide();
            }
        });
        // Prevent Submit
        return false;
    }
});

/*****************************************************************************/
/* DatafileAdd: Helpers */
/*****************************************************************************/
Template.DatafileAdd.helpers({});

/*****************************************************************************/
/* DatafileAdd: Lifecycle Hooks */
/*****************************************************************************/
Template.DatafileAdd.onCreated(function () {});

Template.DatafileAdd.onRendered(function () {
    this.$('.datetimepicker').datetimepicker();
});

Template.DatafileAdd.onDestroyed(function () {});