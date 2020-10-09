<?php

namespace NHS_PARTNERS\FRONTEND\RegisterScripts;


add_action( 'enqueue_block_assets',  __NAMESPACE__ . '\register_scripts' );


function register_scripts(){

	$css_path = '/public/css';


    wp_enqueue_style( 
        'nhs_partners_css',  
        \NHS_PARTNERS\SetUp\get_plugin_url() . $css_path . '/blocks.style.css',
        array(),
        filemtime( \NHS_PARTNERS\SetUp\get_plugin_directory() . $css_path . '/blocks.style.css' )
    );

}