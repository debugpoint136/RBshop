DatasetController = RouteController.extend({

    // A place to put your subscriptions
    // this.subscribe('items');
    // // add the subscription to the waitlist
    // this.subscribe('item', this.params._id).wait();

    subscriptions: function () {
        /*this.subscribe('datasets', Meteor.userId());
        this.subscribe('ratio', this.params._id).wait();*/
    },

    // Subscriptions or other things we want to "wait" on. This also
    // automatically uses the loading hook. That's the only difference between
    // this option and the subscriptions option above.
    // return Meteor.subscribe('post', this.params._id);

    waitOn: function () {
         return this.subscribe('datafiles', this.params._id);
//        return [ Meteor.subscribe('datasets', Meteor.userId()),
//                 Meteor.subscribe('datafiles', this.params._id)
//        ];
    },

    // A data function that can be used to automatically set the data context for
    // our layout. This function can also be used by hooks and plugins. For
    // example, the "dataNotFound" plugin calls this function to see if it
    // returns a null value, and if so, renders the not found template.
    // return Posts.findOne({_id: this.params._id});

    data: function () {
        return Datasets.findOne({
            _id: this.params._id
        });
    },

    add: function () {
        this.render('DatasetAdd', {});
    },

    list: function () {
        this.render('DatasetList', {});
    },
    edit: function () {
        this.render('DatasetEdit', {});
    },
    ratio: function () {
        this.render('RatioList', {});
    }
});