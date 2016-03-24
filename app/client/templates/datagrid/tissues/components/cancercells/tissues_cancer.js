var tisCancSelected = [];
Session.set("tisCancSelected", tisCancSelected);

/*****************************************************************************/
/* TissuesCancer: Event Handlers */
/*****************************************************************************/
Template.TissuesCancer.events({
	'change input': function(event) {
	  	x = event.target.id;
	  	tmp = Session.get("tisCancSelected");
	  	if ( event.target.checked == true) {
		  		if ( x !== 'chkallTissuesCancer'){
		  			tmp.push(x);
		  		} 
		  	Session.set("tisCancSelected", tmp);
	 	} else {
		  	var index = tmp.indexOf(x);
		  	if (index > -1) {
			    tmp.splice(index, 1);
			}
			if ( $('#chkallTissuesCancer')[0].checked == true ){
		  				$('#chkallTissuesCancer').prop('checked', false);
		  			}
		Session.set("tisCancSelected", tmp);
	  }
	  // console.log(Session.get("tisCancSelected"));
	 },
	 'click #chkallTissuesCancer': function(event) {
	 	var tmp = [];
	 	if ( event.target.checked == true) {
            $('#TissueCancer').find('input[name="TissueCancer"]').prop('checked', true);
            $('#TissueCancer').find('input[name="TissueCancer"]').each(function(){
			  	tmp.push($(this).attr('id'));
			  });
            Session.set("tisCancSelected", tmp);
        } else
            $('#TissueCancer').find('input[name="TissueCancer"]').prop('checked', false);
            Session.set("tisCancSelected", tmp);
	 }
	 
});

/*****************************************************************************/
/* TissuesCancer: Helpers */
/*****************************************************************************/
Template.TissuesCancer.helpers({
	
	TissuesCancerCells : function() {
		return ["K562", "A549", "Dnd41", "HeLa-S3", "SK-N-SH", "MCF-7", "LNCaP", "Medullo", "Colo829", "ECC-1", "T-47D", "Medullo_D341", "Ishikawa", "HL-60", "HCT-116", "PANC-1", "SK-N-MC", "RPMI-7951", "M059J", "NT2-D1", "Jurkat", "SK-N-SH_RA", "Caco-2", "NB4", "BE2_C", "WERI-Rb-1", "U2OS", "U87", "Huh-7", "8988T", "Gliobla", "Huh-7.5", "Raji", "SH-SY5Y", "HEK293-T-REx"];
	}
	
});

