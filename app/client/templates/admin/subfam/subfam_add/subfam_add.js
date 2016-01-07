/*****************************************************************************/
/* SubfamAdd: Event Handlers */
/*****************************************************************************/
Template.SubfamAdd.events({
    'submit .add_subfam_form': function (event) {
        var name = event.target.name.value;
        var id = event.target.id.value;
        var genomelength = event.target.genomelength.value;
        var family = event.target.family.value;
        var subfamclass = event.target.subfamclass.value;
        var consensuslength = event.target.consensuslength.value;
        var copycount = event.target.copycount.value;
        var sequence = event.target.sequence.value;

        // Insert Post
        Subfam.insert({
            name: name,
            id: id,
            genomelength: genomelength,
            family: family,
            class: subfamclass,
            consensuslength: consensuslength,
            copycount: copycount,
            sequence: sequence
        });
        // TODO : remove newlines and white space in consensuslength
        // replicate the above in edit_subfam

        toastr.success("Subfam Added");
        Router.go('/admin/subfams');

        // Prevent Submit
        return false;
    }
});

/*****************************************************************************/
/* SubfamAdd: Helpers */
/*****************************************************************************/
Template.SubfamAdd.helpers({});

/*****************************************************************************/
/* SubfamAdd: Lifecycle Hooks */
/*****************************************************************************/
Template.SubfamAdd.onCreated(function () {});

Template.SubfamAdd.onRendered(function () {});

Template.SubfamAdd.onDestroyed(function () {});