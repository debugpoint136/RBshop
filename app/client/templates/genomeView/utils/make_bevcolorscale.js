make_bevcolorscale = function(bev) {

	// csbj - track-specific colorscale runtime object, attached to a bev object
	var csbj={baseline:0}; // colorscale object, track-specific

	/***** draw the color scale panel ***/
    /* 1. calculate distribution, width of color scale defines resolution
     in calculating ratio, many te got value of 0 for below baseline
     the 0 ratio count must be escaped so it won't screw histogram
     */
    var chr2data=bev.data;
    var minv=bev.minv;
    var maxv=bev.maxv;
    var arr=[]; // histogram

    // this is all about the slider so skipping it for now
}