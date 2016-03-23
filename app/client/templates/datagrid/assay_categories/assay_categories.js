/*****************************************************************************/
/* AssayCategories: Event Handlers */
/*****************************************************************************/
Template.AssayCategories.events({
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
