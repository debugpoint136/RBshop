var tisESiPSSelected = [];
Session.set("tisESiPSSelected", tisESiPSSelected);

/*****************************************************************************/
/* TissueESiPS: Event Handlers */
/*****************************************************************************/
Template.TissueESiPS.events({
	'change input': function(event) {
	  	x = event.target.id;
	  	tmp = Session.get("tisESiPSSelected");
	  	if ( event.target.checked == true) {
		  		if ( x !== 'chkallTissuesESiPS'){
		  			if ( sampleKeys[x] ){
		  			sampleKeys[x].forEach(function(s) {
		  				tmp.push(s);
		  			});
		  		} 
		  	}
		  	Session.set("tisESiPSSelected", tmp);
	 	} else {
		  	var index = tmp.indexOf(x);
		  	if (index > -1) {
			    tmp.splice(index, 1);
			}
			if ( $('#chkallTissuesESiPS')[0].checked == true ){
		  				$('#chkallTissuesESiPS').prop('checked', false);
		  			}
		Session.set("tisESiPSSelected", tmp);
	  }
	  // console.log(Session.get("tisESiPSSelected"));
	 },
	 'click #chkallTissuesESiPS': function(event) {
	 	var tmp = [];
	 	if ( event.target.checked == true) {
            $('#TissueESiPS').find('input[name="TissueESiPS"]').prop('checked', true);
            $('#TissueESiPS').find('input[name="TissueESiPS"]').each(function(){
			  	tmp.push($(this).attr('id'));
			  });
            Session.set("tisESiPSSelected", tmp);
        } else
            $('#TissueESiPS').find('input[name="TissueESiPS"]').prop('checked', false);
            Session.set("tisESiPSSelected", tmp);
	 }
	 
});

/*****************************************************************************/
/* TissueESiPS: Helpers */
/*****************************************************************************/
Template.TissueESiPS.helpers({

	TissuesESiPScells : function() {
		return [
			'Derived Cells',
			'Embryonic Stem Cells',
			'Induced Pluripotent Stem Cells'
		];
	}
	
});

