/**
 * Internal dependencies
 */
import ToolTip from './tool-tip';

/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';

const formats = [ ToolTip ];

formats.forEach( ( { name, settings } ) =>
	registerFormatType( name, settings )
);
