<?php
/**
 * Assets class.
 *
 * @package advanced-tooltip
 */

namespace Guten\tooltip\Inc;

use Guten\tooltip\Inc\Traits\Singleton;

/**
 * Class Assets
 */
class Assets {

	use Singleton;

	/**
	 * Current page blocks.
	 *
	 * @var array
	 */
	protected $blocks = [];

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->setup_hooks();

	}

	/**
	 * To setup action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'localize_scripts' ] );
        add_action( 'enqueue_block_editor_assets', [ $this, 'action_enqueue_block_editor_assets' ] ); // Register block editor assets

	}
	
	
	public function register_scripts() {
		wp_register_script("advanced-tooltip-script", ADVANCED_TOOLTIP_URL . '/build/front-end.js', array(), '1.0.0', true );
		// wp_register_style("advanced-tooltip-script", ADVANCED_TOOLTIP_URL . '/build/front-end.js', array(), filemtime( ADVANCED_TOOLTIP_PATH . '/build/front-end.js' ) );
		wp_enqueue_script( 'advanced-tooltip-script' );
	}

	/**
	 * To enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		$this->register_scripts();
		$this->localize_scripts();
		wp_enqueue_style( 'advanced-tooltip', ADVANCED_TOOLTIP_URL . '/build/scss/front-end/main.css', array(), filemtime( ADVANCED_TOOLTIP_PATH . '/build/scss/front-end/main.css' ) );
	}

	/**
	 * To localize scripts
	 */
	public function localize_scripts() {

		$local_script_handle = 'advanced-tooltip-local-object';
		wp_register_script( $local_script_handle, '', array(), GUTEN_TOOLTIP_VERSION );
		wp_localize_script(
			$local_script_handle,
			'tinyBlocks',
			[
				'url' => ADVANCED_TOOLTIP_URL,
				'images' => ADVANCED_TOOLTIP_URL . '/images'
			]
		);
		wp_enqueue_script( $local_script_handle );
	}

    /**
     * Enqueue scripts.
     *
     * @return void
     */
    public function action_enqueue_block_editor_assets(): void {
		
		$this->register_scripts();
	    
	    $cssName = '/build/scss/editor/block-editor.css';
	    $jsName = '/build/index.js';

	    if ( file_exists( ADVANCED_TOOLTIP_PATH . $cssName ) ) {
		    
		    wp_register_style(
			    'advanced-tooltip-editor',
			    ADVANCED_TOOLTIP_URL . $cssName,
			    [],
			    filemtime(  ADVANCED_TOOLTIP_PATH . $cssName  )
		    );
		    
	    }
	    
	    if ( file_exists( ADVANCED_TOOLTIP_PATH . $jsName ) ) {
		    
		    $block_script_asset = [
			    'dependencies' => [],
			    'version'      => filemtime( ADVANCED_TOOLTIP_PATH . $jsName ),
		    ];
		    
		    $assets_file = ADVANCED_TOOLTIP_PATH . '/build/block-editor.asset.php';
		    
		    if ( file_exists( $assets_file ) ) {
			    $assets             = require( $assets_file );
			    $block_script_asset = [
				    'dependencies' => $assets['dependencies'],
				    'version'      => $assets['version'],
			    ];
		    }
		    
		    wp_register_script(
			    'advanced-tooltip-editor',
			    ADVANCED_TOOLTIP_URL . $jsName,
			    $block_script_asset['dependencies'],
			    $block_script_asset['version'],
			    true
		    );
	    }
	    
	    wp_enqueue_script( 'advanced-tooltip-editor' );
	    wp_enqueue_style( 'advanced-tooltip-editor' );
    }

}
