/**
 * External dependencies
 */
const path = require( 'path' );
const { sync: glob } = require( 'fast-glob' );

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );
const editorStyles = glob(
	path.resolve( __dirname, 'src/scss/editor/block-editor.scss' )
);
const styles = glob(
	path.resolve( __dirname, 'src/scss/front-end/main.scss' )
);

function prepare( props = [], depth = 3 ) {
	return Object.fromEntries(
		props.map( ( entry ) => [
			entry
				.split( path.sep )
				.slice( 1 )
				.slice( -depth )
				.join( path.sep )
				.replace( /\.[^/.]+$/, '' ),
			entry,
		] )
	);
}

const entry = prepare( [ ...editorStyles, ...styles ] );

const output = {
	path: path.resolve( __dirname, 'build' ),
	filename: '[name].js',
};

module.exports = ( _, argv ) => {
	const mode = argv.mode === 'development' ? 'development' : 'production';
	return [
		{
			...defaultConfig,
			mode,
			entry: {
				...defaultConfig.entry(),
				'block-editor': path.resolve( __dirname, 'src' ) + '/index.js',
				'front-end':
					path.resolve( __dirname, 'src' ) +
					'/frontend-scripts/index.js',
			},
			output: {
				...defaultConfig.output,
				...output,
			},
		},
		{
			mode,
			entry,
			output,
			resolve: defaultConfig.resolve,
			module: defaultConfig.module,
			plugins: defaultConfig.plugins,
			optimization: defaultConfig.optimization,
		},
	];
};
