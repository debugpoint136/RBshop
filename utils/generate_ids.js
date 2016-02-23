var ObjectID = require('mongodb').ObjectID;

var num = process.argv[2]
for (var i = num - 1; i >= 0; i--) {
	console.log('{"_id": "' + ObjectID().valueOf() + '",');
};
