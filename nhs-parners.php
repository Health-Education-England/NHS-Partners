<?php
/**
 * Plugin Name: NHS Partners Block
 * Plugin URI: https://github.com/Health-Education-England/NHS-Partners
 * Description: NHS Partners Block Plugin
 * Version: 1.0.0
 * Author: VeryTwisty
 */


namespace NHS_PARTNERS\SetUp;

defined( 'ABSPATH' ) || exit;

/**
 * Currently plugin version.
 */
define( 'NHSPARTNERS_VERSION', '1.0.0' );


/**
 * Gets this plugin's absolute directory path.
 *
 * @since  1.0.0
 * @ignore
 * @access private
 *
 * @return string
 */

function get_plugin_directory() {
    return __DIR__;
}

/**
 * Gets this plugin's URL.
 *
 * @since  1.0.0
 * @ignore
 * @access private
 *
 * @return string
 */

function get_plugin_url() {
    static $plugin_url;

    if ( empty( $plugin_url ) ) {
        $plugin_url = plugins_url( null, __FILE__ );
    }

    return $plugin_url;
}


require_once 'admin/admin.php';

require_once 'public/public.php';