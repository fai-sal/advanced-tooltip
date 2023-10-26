/**
 * Internal dependencies
 */
import edit from './edit';
import name from './name';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const ToolTip = {
	name,

	settings: {
		title: __( 'Tooltip', 'advanced-tooltip' ),
		tagName: 'span',
		className: 'has-tooltip',
		attributes: {
			dataTooltip: 'data-tooltip',
		},
		edit,
	},
};

export default ToolTip;
