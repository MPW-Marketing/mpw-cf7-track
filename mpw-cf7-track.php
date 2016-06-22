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
    wp_enqueue_script( 'jscookie')
}
add_action( 'wp_enqueue_scripts', 'mpw_cf7_scripts_method' );
function cf7_tracking () {
$cont = '<span class="cookiediv"></span><script>jQuery( document ).ready( function () {
var utmzCookie = Cookies.get("__utmz");
jQuery(".cookiediv").html(utmzCookie);
});</script>';
return $cont;
}
add_shortcode('cf7_track', 'cf7_tracking');

