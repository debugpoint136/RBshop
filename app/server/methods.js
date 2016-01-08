/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },

  'getTEnodesTree': function () {
    var nodesTree = {};
    var nodeTree_class_family = [];

    // Grab all the unique classes
    var class_nodes = _.uniq(Subfam.find({}, {
          sort: {
            subfamclass: 1
          },
          fields: {
            subfamclass: true
          }
        }).fetch()
        .map(function (x) {
          return x.subfamclass;
        }), true
    );

    // For each class - grab children Families

    class_nodes.forEach(function (classNode) {
      nodeTree_class_family.push(getFamilyNodes(classNode));
    });
    // console.log(nodeTree_class_family);
    // var csv = Papa.unparse(nodeTree_class_family);
    // self._downloadCSV(csv);
    return nodeTree_class_family;
  }
});




function getSubFamilyNodes(familyNode) {
  var nodeTree_class_family_subfamily = {}
  nodeTree_class_family_subfamily['text'] = familyNode;
  var subfamily_children = [];

  var subfamily_nodes = Subfam.find({
    family: familyNode
  }, {
    sort: {
      name: 1
    },
    fields: {
      name: true
    }
  }).fetch();


  subfamily_nodes.forEach(function (subfamilyNode) {
    var subfamily_nodes_obj = {};
    subfamily_nodes_obj['text'] = subfamilyNode.name;
    subfamily_nodes_obj['_id'] = subfamilyNode._id;
    subfamily_children.push(subfamily_nodes_obj)
  });

  nodeTree_class_family_subfamily['children'] = subfamily_children;
  return nodeTree_class_family_subfamily;
}


function getFamilyNodes(classNode) {
  var nodeTree_class_family = {}
  nodeTree_class_family['text'] = classNode;
  var nodeTree_class_family_subfamily = [];

  var family_nodes = _.uniq(Subfam.find({
        subfamclass: classNode
      }, {
        sort: {
          family: 1
        },
        fields: {
          family: true
        }
      }).fetch()
      .map(function (x) {
        return x.family;
      }), true
  );

  family_nodes.forEach(function (familyNode) {
    nodeTree_class_family_subfamily.push(getSubFamilyNodes(familyNode));
  });
  nodeTree_class_family['children'] = nodeTree_class_family_subfamily;

  return nodeTree_class_family;
}

