/*see if get parameters set in url */
function checkUTMTags () {
  var thisUrl = window.location.href;
  var valStart = /utm_source/gi;
  if ( thisUrl.search(valStart) === -1 ) {
    return false;
  }
	var slicedUtm = thisUrl.slice(thisUrl.search(valStart));
 return slicedUtm;
}
/* see if utmz cookie is set */
function getUtmz () {
	var utmzCookie = Cookies.get("__utmz");
	if ( undefined == utmzCookie ) {
		return false;
	}
	var valStart = /utmcsr/gi;
	var slicedUtmzCookie = utmzCookie.slice(utmzCookie.search(valStart));
	//var splitUTMZCookie = slicedUtmzCookie.split("|");
	return slicedUtmzCookie;
}
/* get the utmSourceCookie set value to array */
/*function getUtmSrc () {
  var utmzCookie = Cookies.get("__utmsrc");
  if ( undefined == utmzCookie ) {
    return false;
  }
  var valStart = /utmcsr/gi;
  var slicedUtmzCookie = utmzCookie.slice(utmzCookie.search(valStart));
  var splitUTMZCookie = slicedUtmzCookie.split("|");
  return splitUTMZCookie;
} */
/* get teh traffic source cookie as a fallback*/
function getTrafSource () {
  var trafficCookie = Cookies.get("__traffic_source");
	if ( undefined == trafficCookie ) {
		return "not available";
	}
	return trafficCookie;
}
/*functions to split the cookies value*/
function splitAnd (str) {
  var splitArr = str.split("&");
  return splitArr;
}
function splitPipe (str) {
  var splitArr = str.split("|");
  return splitArr;
}
function splitEquals (item, index) {
splitParts = item.split("=");
return splitParts;
}
/* get the utmSourceCookie set value to array */
function parseSourceCookie () {
  var utmSourceCookie = Cookies.get("__utmsrc");
	if ( undefined == utmSourceCookie ) {
		return false;
	}
	var splitUtmSourceCookie = utmSourceCookie.split("|");
	return splitUtmSourceCookie;
}
/* split an array into an array of arrays*/
function splitArrayDepth (arr) {
  var depthArr = [];
  for (i = 0; i < arr.length; i++) {
    depthArr.push (arr[i].split("="));
  }
  return depthArr;
}
/*turn array of arrays to an object */
function arrToObj (arr) {
  var obj = {};
  for (i = 0; i < arr.length; i++) {
    var idn = arr[i][0];
    var val = arr[i][1];
    obj[idn] = val;
}
return obj;
}
function readSourceObject (obj) {
  jQuery(".utmsource").val(obj.source);
  jQuery(".utmcamp").val(obj.campaign);
  jQuery(".utmmediun").val(obj.medium);
  jQuery(".utmterm").val(obj.term);
  return obj;
}
/*determine what data we have and set cookies if needed*/
function objType (obj) {
  var source = "";
  var medium = "";
  var content = "";
  var term = "";
  var campaign = "";

  if (obj.utm_source != undefined) {
    source = obj.utm_source;
    medium = obj.utm_medium;
    content = obj.utm_content;
    term = obj.utm_term;
    campaign = obj.utm_campaign;

  } else if ( obj.utmcsr != undefined) {
    source = obj.utmcsr;
    medium = obj.utmcmd;
    term = obj.utmctr;
    campaign = obj.utmccn;
  } else {
    source = getTrafSource ();
  }
  var result = "source="+source+"|medium="+medium+"|campaign="+campaign+"|term="+term;
  return result;
  }

  function setMyCookie ( str) {
    Cookies.set("__utmsrc", str, { expires: 365, path: '/' });
    return true;
  }
  function setCookieIfNeeded () {
    var splitChkUtm  = [];
    var deepSplitUtm =  [];
    var utmObj = {};
    var cookieString = "";
    var chkutm = checkUTMTags (); //see if get parameters set in url
    var chkutz = getUtmz (); //see if utmz cookie is set
    var chkutmsource = parseSourceCookie (); //check if utm source cookie set
    if (chkutm) { //if url parameters use them regardless of cookie
      splitChkUtm = splitAnd(chkutm);
    } else if (chkutmsource) { //otherwise if the cookie is already set leave it
      return false;
    } else if (chkutz) { // otherwise check if their is a utmz cookie and use that
      splitChkUtm = splitPipe(chkutz);
    }
    deepSplitUtm = splitArrayDepth(splitChkUtm);
    utmObj = arrToObj(deepSplitUtm);
    cookieString = objType(utmObj);
    setMyCookie(cookieString);
  }
  function readSourceCookie () {
    var chkutmsource = parseSourceCookie ();
    if (chkutmsource){
    var deepSplitUtm =  splitArrayDepth(chkutmsource);
    var utmObj = arrToObj(deepSplitUtm);
    readSourceObject(utmObj);
    return true;
  } else {
    return false;
  }
  }
jQuery( document ).ready( function () {
setCookieIfNeeded ();
readSourceCookie ();
sbjs.init();
  });
