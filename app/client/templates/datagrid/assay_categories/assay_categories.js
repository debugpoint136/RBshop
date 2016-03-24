var acSelected = [];
Session.set("acSelected", acSelected);
/*****************************************************************************/
/* AssayCategories: Event Handlers */
/*****************************************************************************/
Template.AssayCategories.events({
	'change input': function(event) {
	  	x = event.target.id;
	  	tmp = Session.get("acSelected")
	  	if ( event.target.checked == true) {
		  		if ( x !== 'chkallAssays'){
		  			tmp.push(x);
		  		} 
		  	Session.set("acSelected", tmp);
	 	} else {
		  	var index = tmp.indexOf(x);
		  	if (index > -1) {
			    tmp.splice(index, 1);
			}
			if ( $('#chkallAssays')[0].checked == true ){
		  				$('#chkallAssays').prop('checked', false);
		  			}
		Session.set("acSelected", tmp);
	  }
	 },
	 'click #chkallAssays': function(event) {
	 	var tmp = [];
	 	if ( event.target.checked == true) {
            $('#assayTable').find('input[name="assayCategory"]').prop('checked', true);
            $('#assayTable').find('input[name="assayCategory"]').each(function(){
			  	tmp.push($(this).attr('id'));
			  });
            Session.set("acSelected", tmp);
        } else
            $('#assayTable').find('input[name="assayCategory"]').prop('checked', false);
            Session.set("acSelected", tmp);
	 }
});

/*****************************************************************************/
/* AssayCategories: Helpers */
/*****************************************************************************/
Template.AssayCategories.helpers({
	AssayCategoryList : function() {
		return [
			'DNA Methylation',
			'Histone Mark',
			'Histone-modifying enzymes',
			'Other Epigenetic Mark',
			'Transcription Factor Binding Sites',
			'Other Transcription Regulator'
		]
	}
});

/*****************************************************************************/
/* AssayCategories: Lifecycle Hooks */
/*****************************************************************************/
Template.AssayCategories.onCreated(function () {
});

Template.AssayCategories.onRendered(function () {
});

Template.AssayCategories.onDestroyed(function () {
});

