function checkUTMTags () {
  var thisUrl = window.location.href;
  var valStart = /utm_source/gi;
  if ( thisUrl.search(valStart) === -1 ) {
    return;
  }
	var slicedUtm = thisUrl.slice(thisUrl.search(valStart));
  	if ( undefined == Cookies.get("__utmz") ){
  Cookies.set("__utmz", slicedUtm, { expires: 365, path: '/' });
} else {
  Cookies.set("__utmzz", slicedUtm, { expires: 365, path: '/' });
}
  var splitUTM = slicedUtm.split("&");
 return splitUTM;
}
function getUtmz () {
	var utmzCookie = Cookies.get("__utmz");
	if ( undefined == utmzCookie ) {
		return;
	}
	var valStart = /utmcsr/gi;
	var slicedUtmzCookie = utmzCookie.slice(utmzCookie.search(valStart));
	var splitUTMZCookie = slicedUtmzCookie.split("|");
	return splitUTMZCookie;
}
function getTrafSource () {
  var trafficCookie = Cookies.get("__traffic_source");
	if ( undefined == trafficCookie ) {
		return;
	}
	return trafficCookie;
}

jQuery( document ).ready( function () {
  var chkutm = checkUTMTags ();
  });
