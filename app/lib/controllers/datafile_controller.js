DatafileController = RouteController.extend({

    waitOn: function () {
        return this.subscribe('datafile', this.params._id)
    },


    data: function () {
        return Datafiles.findOne({
            _id: this.params._id
        });
    },

    edit: function () {
    this.render('DatafileEdit', {});
}


});