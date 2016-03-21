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
			'Histone',
			'Methylome',
			'Transcriptome',
			'Regulome',
			'TFBS',
			'Other'
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
