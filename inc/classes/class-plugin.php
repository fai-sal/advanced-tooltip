<?php
/**
 * Plugin manifest class.
 *
 * @package guten-tooltip
 */

namespace Guten\tooltip\Inc;

use \Guten\tooltip\Inc\Traits\Singleton;

/**
 * Class Plugin
 */
class Plugin {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		// Load plugin classes.
		Assets::get_instance();

	}

}
