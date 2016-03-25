var tisAduSelected = [];
Session.set("tisAduSelected", tisAduSelected);

/*****************************************************************************/
/* TissuesAdult: Event Handlers */
/*****************************************************************************/
Template.TissuesAdult.events({
	'change input': function(event) {
	  	x = event.target.id;
	  	tmp = Session.get("tisAduSelected")
	  	if ( event.target.checked == true) {
		  		if ( x !== 'chkallTissuesAdult'){
		  			if ( sampleKeys[x] ){
		  			sampleKeys[x].forEach(function(s) {
		  				tmp.push(s);
		  			});
		  		} 
		  	}
		  	Session.set("tisAduSelected", tmp);
	 	} else {
		  	var index = tmp.indexOf(x);
		  	if (index > -1) {
			    tmp.splice(index, 1);
			}
			if ( $('#chkallTissuesAdult')[0].checked == true ){
		  				$('#chkallTissuesAdult').prop('checked', false);
		  			}
		Session.set("tisAduSelected", tmp);
	  }
	  // console.log(Session.get("tisAduSelected"));
	 },
	 'click #chkallTissuesAdult': function(event) {
	 	var tmp = [];
	 	if ( event.target.checked == true) {
            $('#TissueAdult').find('input[name="TissueAdult"]').prop('checked', true);
            $('#TissueAdult').find('input[name="TissueAdult"]').each(function(){
			  	tmp.push($(this).attr('id'));
			  });
            Session.set("tisAduSelected", tmp);
        } else
            $('#TissueAdult').find('input[name="TissueAdult"]').prop('checked', false);
            Session.set("tisAduSelected", tmp);
	 }
	 
});

/*****************************************************************************/
/* TissuesAdult: Helpers */
/*****************************************************************************/
Template.TissuesAdult.helpers({
	TissuesAdultData : function() {
		return ["Blood", "Bone", "Muscle", "Breast", "Skin", "Liver", "Brain", "Genitourinary", "Lung", "Gastrointestinal", "Spleen", "Kidney", "Tonsil", "Heart", "Psoas_Muscle", "Stromal-Connective", "Frontal_Cortex", "Adult_Miscellaneous", "Nasal_Biopsy", "Epithelial",  "Eye", "Endothelia"];
	}
});