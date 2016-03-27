callGenomeGraph = function(coordinate) {
    Session.set('coordinate', coordinate);
    var subfamClicked = Subfam.findOne({
        name: coordinate[1]
    	});
    // SESSION : set filename string for integration with main browser
    var subfamfile = subfamClicked.subfamclass + subfamClicked.family +subfamClicked.name ;
    Session.set('subfamfile', subfamfile);

    if( subfamClicked.consensuslength === "0"){
    	toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-right",
		  "preventDuplicates": true,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
    	toastr.error('Cannot load Consensus View: \nConsensus length not found ');
    } else {
    	// $.blockUI({ message: null }); 
     	// setTimeout($.unblockUI, 2000 );
    	Router.go('/gg');
    }
}