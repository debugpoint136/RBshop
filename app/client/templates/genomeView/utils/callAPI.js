callAPI = function(apiName, url) {

	Meteor.call(apiName, url, function(error, res) {
	  if (!error) {
	        var data = eval('(' + res + ')');
	        parseData_exp_bev(data); 
	  } else {
	    console.log(error);
	  }
	});
}