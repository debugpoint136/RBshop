populateInfoOnButton = function(divElement, banner){
	var label = '#' + divElement + '_label';
	d3.select(label)
		.select('button')
		.attr('name', banner)
		.style('display', 'inline')
		;

/*	
	var urlString = 'http://epigenomegateway.wustl.edu/cgi-bin/subtleKnife?repeatbrowser%3Don%26getfileinfo%3D' + banner + '%26rpbrDbname%3Dhg19repeat';
	Meteor.call('httpGETcall', urlString, function(err, res) {
		var details = eval('(' + res + ')');
		d3.select(label).append('text')
			.text(details.text);
	});	
*/
}