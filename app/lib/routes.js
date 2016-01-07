Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

Router.map(function() {
    this.route('contact', {
        path: '/contact',
        template: 'contact'
    });

    this.route('genome', {
        path: '/genome',
        template: 'select_genome'
    });

    this.route('datasource', {
        path: '/datasource',
        template: 'select_datasource'
    });

    this.route('te', {
        name: '/te',
        path: '/te',
        template: 'select_te',
        waitOn: function () {
            return this.subscribe('subfam');
        }
    });

    this.route('datasets', {
        name: '/data',
        path: '/data',
        template: 'select_dataset',
//        data: function () {
//            templateData = {
//                datasets: Datasets.find()
//            };
//            return templateData;
//        }
    });
});

Router.route('/', {
    name: 'home',
    controller: 'HomeController',
    where: 'client'
});

Router.route('/heatmap', {
    name: 'Heatmap',
    controller: 'HeatmapController',
    where: 'client'
});


/* ============================== */
/*            Datasets            */
/* ============================== */

Router.route('admin/dataset/add', {
    name: 'DatasetAdd',
    controller: 'DatasetController',
    action: 'add',
    where: 'client'
});

Router.route('admin/dataset/edit/:_id', {
    name: 'DatasetEdit',
    controller: 'DatasetController',
    action: 'edit',
    where: 'client'
});

Router.route('admin/datasets', {
    name: 'DatasetList',
    controller: 'DatasetController',
    action: 'list',
    where: 'client'
});

/* ============================== */
/*            Datafiles           */
/* ============================== */

Router.route('/admin/datafile/add', {
    name: 'DatafileAdd',
    controller: 'DatafileController',
    action: 'add',
    where: 'client'
});

Router.route('/admin/datafile/edit/:_id', {
    name: 'DatafileEdit',
    controller: 'DatafileController',
    action: 'edit',
    where: 'client'
});

Router.route('admin/datafiles', {
    name: 'DatafileList',
    controller: 'DatafileController',
    action: 'list',
    where: 'client'
});

/* ============================== */
/*            Subfamilies         */
/* ============================== */

Router.route('admin/subfam/add', {
    name: 'SubfamAdd',
    controller: 'SubfamController',
    action: 'add',
    where: 'client'
});

Router.route('admin/subfam/edit/:_id', {
    name: 'SubfamEdit',
    controller: 'SubfamController',
    action: 'edit',
    where: 'client'
});

Router.route('admin/subfams', {
    name: 'SubfamList',
    controller: 'SubfamController',
    action: 'list',
    where: 'client'
});

/* ================================ */
/*   Subfamilies Genome Fragments   */
/* ================================ */

Router.map(function () {
    Router.route('/admin/subfam/edit/:_id/fragments', {
        name: 'SubfamFragments',
        template: 'SubfamFragments',
        waitOn: function () {
            return this.subscribe('subfamfragments', this.params._id);
        },
        data: function () {
            templateData = {
                 subfamfrags: SubfamFragments.find({
                    subfamid: this.params._id
                })
            }
            return templateData;
        },
        where: 'client'
    });
});

/* ================================ */
/*           Computed Ratios        */
/* ================================ */


/*Router.route('/admin/dataset/:_id/ratio', {
    name: 'RatioList',
    template: 'RatioList',
    waitOn: function () {
        return this.subscribe('ratio', this.params._id);
    },
    data: function () {
        templateData = {
            ratiodata: Ratio.find({
                datasetId: this.params._id
            })
        }
        return templateData;
    },
    where: 'client'
});*/

/* ================================ */
/*           Genome Graph           */
/* ================================ */

Router.route('/genome_graph', {
    name: 'GenomeGraph',
    controller: 'GenomeGraphController',
    action: 'list',
    where: 'client'
});