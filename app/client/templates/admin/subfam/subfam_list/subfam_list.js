/*****************************************************************************/
/* SubfamList: Event Handlers */
/*****************************************************************************/
Template.SubfamList.events({
    'click .delete_subfam': function (event) {
        if (confirm("Are you sure?")) { // TODO : try moving this to toastr style
            Subfam.remove(this._id);
            toastr.success("Subfamily record Deleted");
            // Prevent Submit
            return false;
        }
    }
});

/*****************************************************************************/
/* SubfamList: Helpers */
/*****************************************************************************/
Template.SubfamList.helpers({
    subfams: function () {
        return Subfam.find();
    }
});

/*****************************************************************************/
/* SubfamList: Lifecycle Hooks */
/*****************************************************************************/
Template.SubfamList.onCreated(function () {
    this.subscribe('subfam');
});

Template.SubfamList.onRendered(function () {});

Template.SubfamList.onDestroyed(function () {});