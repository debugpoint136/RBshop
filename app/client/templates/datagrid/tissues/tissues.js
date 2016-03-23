/*****************************************************************************/
/* Tissues: Event Handlers */
/*****************************************************************************/
Template.Tissues.events({
});

/*****************************************************************************/
/* Tissues: Helpers */
/*****************************************************************************/
Template.Tissues.helpers({
	TissuesAdult : function() {
		return [
			'Adrenal',
			'Blood',
			'Bone',
			'Bone Marrow',
			'Brain',
			'Breast',
			'Cell Line',
			'ES Cells',
			'ES-derived cells',
			'Endothelia',
			'Epithelial',
			'Eye',
			'Fat',
			'Gastrointestinal',
			'Genitourinary',
			'Heart',
			'Hematopoietic Stem',
			'Kidney',
			'Liver',
			'Lung',
			'Muscle',
			'Other',
			'Pancreas',
			'Placenta',
			'Primary Cell',
			'Skin',
			'Spleen',
			'Stromal',
			'Thymus',
			'Thyroid',
			'Tonsil',
			'forelimb/hindlimb',
			'iPS Cells'
		];
	},
	TissuesCancerCells : function() {
		return ["K562", "A549", "Dnd41", "HeLa-S3", "SK-N-SH", "MCF-7", "LNCaP", "Medullo", "Colo829", "ECC-1", "T-47D", "Medullo_D341", "Ishikawa", "HL-60", "HCT-116", "PANC-1", "SK-N-MC", "RPMI-7951", "M059J", "NT2-D1", "Jurkat", "SK-N-SH_RA", "Caco-2", "NB4", "BE2_C", "WERI-Rb-1", "U2OS", "U87", "Huh-7", "8988T", "Gliobla", "Huh-7.5", "Raji", "SH-SY5Y", "HEK293-T-REx"];
	},
	TissuesESiPScells : function() {
		return [
			'Derived Cells',
			'Embryonic Stem Cells',
			'Induced Pluripotent Stem Cells'
		];
	},
	TissuesFetal : function() {
		return ["Fetal_Lung", "Fetal_Kidney", "Fetal_Brain", "Fetal_Adrenal_Gland", "Fetal_Heart", "Fetal_Intestine,_Large", "Fetal_Thymus", "Fetal_Intestine,_Small", "Fetal_Stomach", "Fetal_Muscle", "Fetal_Spleen", "Fetal_Placenta", "Fetal_Skin", "Fetal_Membrane", "Fetal_Spinal_Cord", "Fetal_Testes", "Fetal_Liver"];
	}
	
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
