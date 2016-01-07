/*****************************************************************************/
/* RatioList: Event Handlers */
/*****************************************************************************/
Template.RatioList.events({
    'click .js-delete_ratioinfo': function (event) {
        if (confirm("Are you sure?")) { // TODO : try moving this to toastr style
            Ratio.remove(this._id);
            toastr.success("Ratio data Deleted");
            // Prevent Submit
            return false;
        }
    }
});

/*****************************************************************************/
/* RatioList: Helpers */
/*****************************************************************************/
Template.RatioList.helpers({
//    ratiodata: function () {
//        var datasetID = this.params._id;
//        console.log(datasetID);
//        return Ratio.find({
//            datasetId: datasetID
//        });
//    }
});

/*****************************************************************************/
/* RatioList: Lifecycle Hooks */
/*****************************************************************************/
Template.RatioList.onCreated(function () {
    // this.subscribe('ratio', this.params._id);
});

Template.RatioList.onRendered(function () {});

Template.RatioList.onDestroyed(function () {});