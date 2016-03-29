var datasetsforBrowsing = [];
Session.set("datasetsforBrowsing", datasetsforBrowsing);
/*****************************************************************************/
/* SelectedDatasets: Event Handlers */
/*****************************************************************************/
Template.SelectedDatasets.events({
	'change input': function(event) {
	  	x = event.target.id;
	  	tmp = Session.get("datasetsforBrowsing")
	  	if ( event.target.checked == true) {
	  			if ( x != 'chkallDatasets')
  					tmp.push(x);
  				Session.set("datasetsforBrowsing", tmp);
		  	}	
	 	else {
		  	var index = tmp.indexOf(x);
		  	if (index > -1) {
			    tmp.splice(index, 1);
			}
			if ( $('#chkallDatasets')[0].checked == true ){
		  				$('#chkallDatasets').prop('checked', false);
		  			}
		Session.set("datasetsforBrowsing", tmp);
	  }
	 },
	 'click #chkallDatasets': function(event) {
	 	var tmp = [];
	 	if ( event.target.checked == true) {
            $('#DatasetsBrowse').find('input[name="datasetsBrowse"]').prop('checked', true);
            $('#DatasetsBrowse').find('input[name="datasetsBrowse"]').each(function(){
			  	tmp.push($(this).attr('id'));
			  });
            Session.set("datasetsforBrowsing", tmp);
        } else
            $('#DatasetsBrowse').find('input[name="datasetsBrowse"]').prop('checked', false);
            Session.set("datasetsforBrowsing", tmp);
	 },
	 'click #resetDatasets': function(){
	 	var tmp = [];
	 	Session.set("datasetsClicked", tmp)
;	 }
});

/*****************************************************************************/
/* SelectedDatasets: Helpers */
/*****************************************************************************/
Template.SelectedDatasets.helpers({
	datasetsClickedonGrid : function() {
		return Session.get("datasetsClicked");
	},
	readyForBrowser: function() {
		var tmp = Session.get('datasetsforBrowsing');
		return tmp;
	}
});

/*****************************************************************************/
/* SelectedDatasets: Lifecycle Hooks */
/*****************************************************************************/
Template.SelectedDatasets.onCreated(function () {
});

Template.SelectedDatasets.onRendered(function () {
});

Template.SelectedDatasets.onDestroyed(function () {
});
