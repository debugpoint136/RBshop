callAPI = function(apiName, url, bev, data, props) {

	Meteor.call(apiName, url, function(error, res) {
	  if (!error) {
	        var data = eval('(' + res + ')');
	        /* PROD */  make_genomebev_base(data, bev, props); 
	        // parseData_exp_bev(data);
			
	  } else {
	    console.log(error);
	  }
	});
}