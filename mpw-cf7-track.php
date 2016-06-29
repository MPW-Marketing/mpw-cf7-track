<?php
/*
Plugin Name: MPW CF7 Tracking
Description: Add Tracking Data to CF7
Version: 0.2
Author: dmm
Text Domain: mpw-cf7
*/
function mpw_cf7_scripts_method() {
    wp_register_script( 'sourcebuster', plugins_url( '/js/sourcebuster.min.js' , __FILE__ ), array( 'jquery' ), '0.1', false );
    wp_enqueue_script( 'sourcebuster');
    wp_register_script( 'cf7-track', plugins_url( '/js/cf7-track.js' , __FILE__ ), array( 'jquery', 'sourcebuster' ), '0.1', false );
    wp_enqueue_script( 'cf7-track');
}
add_action( 'wp_enqueue_scripts', 'mpw_cf7_scripts_method' );
function cf7_tracking () {
$cont = '<script>
jQuery( document ).ready( function () {
readSourceObject();
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
