var tisFetSelected = [];
Session.set("tisFetSelected", tisFetSelected);

/*****************************************************************************/
/* TissueFetal: Event Handlers */
/*****************************************************************************/
Template.TissueFetal.events({
	'change input': function(event) {
	  	x = event.target.id;
	  	tmp = Session.get("tisFetSelected");
	  	if ( event.target.checked == true) {
		  		if ( x !== 'chkallTissuesFetal'){
		  			tmp.push(x);
		  		} 
		  	Session.set("tisFetSelected", tmp);
	 	} else {
		  	var index = tmp.indexOf(x);
		  	if (index > -1) {
			    tmp.splice(index, 1);
			}
			if ( $('#chkallTissuesFetal')[0].checked == true ){
		  				$('#chkallTissuesFetal').prop('checked', false);
		  			}
		Session.set("tisFetSelected", tmp);
	  }
	  // console.log(Session.get("tisFetSelected"));
	 },
	 'click #chkallTissuesFetal': function(event) {
	 	var tmp = [];
	 	if ( event.target.checked == true) {
            $('#TissueFetal').find('input[name="TissueFetal"]').prop('checked', true);
            $('#TissueFetal').find('input[name="TissueFetal"]').each(function(){
			  	tmp.push($(this).attr('id'));
			  });
            Session.set("tisFetSelected", tmp);
        } else
            $('#TissueFetal').find('input[name="TissueFetal"]').prop('checked', false);
            Session.set("tisFetSelected", tmp);
	 }
	 
});

/*****************************************************************************/
/* TissueFetal: Helpers */
/*****************************************************************************/
Template.TissueFetal.helpers({
	TissuesFetal : function() {
		return ["Fetal_Lung", "Fetal_Kidney", "Fetal_Brain", "Fetal_Adrenal_Gland", "Fetal_Heart", "Fetal_Intestine,_Large", "Fetal_Thymus", "Fetal_Intestine,_Small", "Fetal_Stomach", "Fetal_Muscle", "Fetal_Spleen", "Fetal_Placenta", "Fetal_Skin", "Fetal_Membrane", "Fetal_Spinal_Cord", "Fetal_Testes", "Fetal_Liver"];
	}
});