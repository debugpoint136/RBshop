
globalDep = new Tracker.Dependency();

Template.select_te.onRendered(function () {
    this.$('.tree').jstree({
        "types": {
            "default": {
                "icon": "glyphicon glyphicon-flash"
            },
        },
        "plugins": ["checkbox", "search", "types"],

        core: {
            data: function (node, cb) {
                globalDep.depend();
                var nodes;
                if (node.id === '#') {
                    var rootNode = [{
                        text: 'All Subfamilies',
                        id: '1',
                        children: true,
                        state: {
                            opened: true
                        }
                    }];
                    cb(rootNode);
                } else {
                    Meteor.call('getTEnodesTree', {},  (err, res) => {
                        if (err)
                    {
                        alert(err);
                    }
                else
                    {
                        // success!
                        nodes = res;
                        // var csv = Papa.unparse(nodes);
                        // _downloadCSV(csv);
                        cb(nodes);
                    }
                });


                }
            }
        }
    });

});

Template.select_te.events({
    'submit #s': function (e) {
        e.preventDefault();
        // $(".tree").jstree(true).search($("#q").val());
        tree_json = $('.tree').data().jstree.get_json();
        //var tree_json = jQuery.jstree._reference('.tree').get_json(-1, ['data-title', 'data-link-type', 'id', 'class']);
        console.log(tree_json);
        var selectedNodes = $('.tree').jstree('get_selected').data('id');
        console.log(selectedNodes);
    }
});

function _downloadCSV(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "subfamilies.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

