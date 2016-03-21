/* more util functions */
coordSort = function(a,b) {return a[0]-b[0];}

scoreSort = function(a,b) {return b[2]-a[2];}

fetchRepeatsSelection = function() {
	var totalSelectedCount = 0;
    var negElements = d3.selectAll('.selectedNeg').size(),
        posElements = d3.selectAll('.selectedPos').size(),
        zeroElements = d3.selectAll('.selectedZero').size();

    totalSelectedCount = negElements + posElements + zeroElements;
    Session.set( 'ssnRepeatSelected', totalSelectedCount );
    return totalSelectedCount;
}

ajaxPost = function(data2post, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var t = req.responseText;
            if (t.substr(0, 5) == 'ERROR') {
                print2console('Failed to post data to server', 3);
                callback(null);
            } else {
                callback(t);
            }
        }
    };
    req.open('POST', "" + 'http://epigenomegateway.wustl.edu/cgi-bin/postdeposit', true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(data2post);
}

