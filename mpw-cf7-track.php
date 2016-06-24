<?php
/*
Plugin Name: MPW CF7 Tracking
Description: Add Tracking Data to CF7
Version: 0.1a
Author: dmm
Text Domain: mpw-cf7
*/
function mpw_cf7_scripts_method() {
    wp_register_script( 'jscookie', plugins_url( '/js/js.cookie.js' , __FILE__ ), array( 'jquery' ), '2.1', false );
    wp_enqueue_script( 'jscookie');
    wp_register_script( 'utm_alternative', plugins_url( '/js/utm_alternative.js' , __FILE__ ), array( 'jquery' ), '1.1', false );
    wp_enqueue_script( 'utm_alternative');
}
add_action( 'wp_enqueue_scripts', 'mpw_cf7_scripts_method' );
function cf7_tracking () {
$cont = '<script>
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
function checkUTMTags () {
  var thisUrl = window.location.href;
  var valStart = /utm_source/gi;
  if ( thisUrl.search(valStart) === -1 ) {
    return;
  }
	var slicedUtm = thisUrl.slice(thisUrl.search(valStart));
  	if ( undefined == Cookies.get("__utmz") ){
  Cookies.set("__utmz", slicedUTM, { expires: 365, path: '/' });
} else {
  Cookies.set("__utmzz", slicedUTM, { expires: 365, path: '/' });
}
  var splitUTM = slicedUtm.split("&");
 return splitUTM;
}
jQuery( document ).ready( function () {
  var chkutm = checkUTMTags ();
 var utz = getUtmz ();
 if (utz != undefined ) {
 var utzInfo = [];
 utzInfo.push(utz[0].split("="));
 utzInfo.push(utz[1].split("="));
  utzInfo.push(utz[2].split("="));
  utzInfo.push(utz[3].split("="));
jQuery(".utmsource").val(utzInfo[0][1]);
jQuery(".utmcamp").val(utzInfo[1][1]);
jQuery(".utmmediun").val(utzInfo[2][1]);
jQuery(".utmterm").val(utzInfo[3][1]);
}
var httpRef = document.referrer;
var currentPage = window.location.href;
jQuery(".httpReferrer").val(httpRef);
jQuery(".currentPage").val(currentPage);
});</script>';
return $cont;
}
add_shortcode('cf7_track', 'cf7_tracking');

add_filter( 'wpcf7_form_elements', 'mycustom_wpcf7_form_elements' );

function mycustom_wpcf7_form_elements( $form ) {
	$form = do_shortcode( $form );

	return $form;
}
