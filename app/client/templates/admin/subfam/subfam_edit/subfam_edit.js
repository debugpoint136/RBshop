/*****************************************************************************/
/* SubfamEdit: Event Handlers */
/*****************************************************************************/
Template.SubfamEdit.events({
    'submit .edit_subfam_form': function (event) {
        var name = event.target.name.value;
        var id = event.target.id.value;
        var genomelength = event.target.genomelength.value;
        var family = event.target.family.value;
        var subfamclass = event.target.subfamclass.value;
        var consensuslength = event.target.consensuslength.value;
        var copycount = event.target.copycount.value;
        var sequence = event.target.sequence.value;

        // Update Subfam
        Subfam.update({
            _id: this._id
        }, {
            $set: {
                name: name,
                id: id,
                genomelength: genomelength,
                family: family,
                subfamclass: subfamclass,
                consensuslength: consensuslength,
                copycount: copycount,
                sequence: sequence
            }
        });

        toastr.success("Subfam Updated");
        Router.go('/admin/subfams');

        // Prevent Submit
        return false;
    }
});

/*****************************************************************************/
/* SubfamEdit: Helpers */
/*****************************************************************************/
Template.SubfamEdit.helpers({});

/*****************************************************************************/
/* SubfamEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.SubfamEdit.onCreated(function () {
    this.subscribe('subfam');
});

Template.SubfamEdit.onRendered(function () {});

Template.SubfamEdit.onDestroyed(function () {});