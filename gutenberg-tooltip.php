<?php
/**
 * Plugin Name: Gutenberg Tooltip
 * Description: Tooltip for Richtext
 * Plugin URI:  #
 * Author:      faisalahmed29
 * Author URI:  https://faisaal.dev/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     1.0.0
 * Requires PHP: 7.4
 * Text Domain: guten-tooltip
 *
 * @package guten-tooltip
 */

define( 'GUTENBERG_TOOLTIP_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GUTENBERG_TOOLTIP_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'GUTENBERG_TOOLTIP_SRC_PATH', plugin_dir_path( __FILE__ ) . 'assets/src/blocks' );

const GUTEN_TOOLTIP_VERSION = 1.0;
require_once GUTENBERG_TOOLTIP_PATH . '/inc/helpers/autoloader.php';

/**
 * To load plugin manifest class.
 *
 * @return void
 */
function guten_tooltip() {
	\Guten\tooltip\Inc\Plugin::get_instance();
}

guten_tooltip();
