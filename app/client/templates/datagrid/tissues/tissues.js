tissuesSelected = [];
Session.set("tissuesSelected", tissuesSelected);
/*****************************************************************************/
/* Tissues: Event Handlers */
/*****************************************************************************/
Template.Tissues.events({
	 'change input': function() {
	 	tissuesSelected = 
		   	Session.get("tisAduSelected").concat(
		   	Session.get("tisCancSelected"),
		   	Session.get("tisESiPSSelected"),
		   	Session.get("tisFetSelected")
		   	);

	 	Session.set("tissuesSelected", tissuesSelected);
	  }
});

/*****************************************************************************/
/* Tissues: Helpers */
/*****************************************************************************/
Template.Tissues.helpers({
	
});

/*****************************************************************************/
/* Tissues: Lifecycle Hooks */
/*****************************************************************************/
Template.Tissues.onCreated(function () {
});

Template.Tissues.onRendered(function () {
});

Template.Tissues.onDestroyed(function () {
});
