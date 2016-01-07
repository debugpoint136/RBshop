/*****************************************************************************/
/* DatafileEdit: Event Handlers */
/*****************************************************************************/
Template.DatafileEdit.events({
    'submit .handle-datafile-edit-submit': function (event) {
        var name = event.target.name.value;
        var label = event.target.label.value;
        var type = event.target.type.value;
        var metadata = event.target.metadata.value;
        var url = event.target.url.value;
        var updatedAt = event.target.updatedAt.value;
        var updatedBy = event.target.updatedBy.value;
        var comments = event.target.comments.value;
        var addedBy = event.target.addedBy.value;
        var projectDate = event.target.projectDate.value;



        // Update Dataset
        Datasets.update({
            _id: this._id
        }, {
            $set: {
                name: name,
                label: label,
                type: type,
                metadata :  metadata,
                url : url,
                updatedAt : updatedAt,
                updatedBy : updatedBy,
                comments : comments,
                addedBy : addedBy,
                projectDate: projectDate
            }
        });

        toastr.success("Datafile Updated");
        Router.go('/admin/datasets');

        // Prevent Submit
        return false;
    },
});

/*****************************************************************************/
/* DatafileEdit: Helpers */
/*****************************************************************************/
Template.DatafileEdit.helpers({
    templateData: function () {
        return Datafiles.findOne({
            _id: this.params._id
        });
    }
});

/*****************************************************************************/
/* DatafileEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.DatafileEdit.onCreated(function () {
});

Template.DatafileEdit.onRendered(function () {
    this.$('.datetimepicker').datetimepicker();
});

Template.DatafileEdit.onDestroyed(function () {
});
