/**
 * WordPress dependencies
 */

import { BlockFormatControls } from '@wordpress/block-editor';
import { removeFormat, applyFormat } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';
import {
	Dropdown,
	IconButton,
	Toolbar,
	Button,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icon from './icon';
import name from './name';

const typename = name;

const TOOLTIPSTYLE = {
	width: '260px',
	padding: '14px',
};
const INPUTSTYLE = {
	marginBottom: '10px',
	width: '100%',
	display: 'block',
};

export default function ToolTip( { activeAttributes, value, onChange } ) {
	const { dataTooltip: toolTipData } = activeAttributes;
	const [ toolTipText, setToolTipText ] = useState( toolTipData );

	/**
	 * Retrieving saved value
	 */
	useEffect( () => {
		setToolTipText( toolTipData );
	}, [ toolTipData ] );

	const addTooltip = () => {
		if ( toolTipData !== toolTipText && toolTipText.length > 0 ) {
			onChange(
				applyFormat( value, {
					type: typename,
					attributes: {
						dataTooltip: toolTipText,
					},
				} )
			);
		} else if ( toolTipText.length === 0 ) {
			onChange( removeFormat( value, typename ) );
		}
	};

	return (
		<BlockFormatControls>
			<Toolbar>
				<Dropdown
					className="tooltip-selector"
					contentClassName="tooltip_popover"
					position="bottom right"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<IconButton
							icon={ icon }
							label="Tooltip"
							aria-haspopup="true"
							aria-expanded={ isOpen }
							onClick={ () => onToggle() }
							className={
								toolTipData ? 'is-pressed' : 'inactive'
							}
						/>
					) }
					renderContent={ ( { onToggle } ) => (
						<div
							className="tooltip-input_wrapper"
							style={ TOOLTIPSTYLE }
						>
							<TextareaControl
								style={ INPUTSTYLE }
								label={ __( 'Tooltip Text', 'guten-tooltip' ) }
								value={ toolTipText }
								onChange={ ( nextValue ) =>
									setToolTipText( nextValue ?? '' )
								}
							/>

							<Button
								variant="primary"
								onClick={ () => {
									addTooltip();
									onToggle();
								} }
								disabled={ toolTipData === toolTipText }
							>
								{ __( 'Add', 'guten-tooltip' ) }
							</Button>
						</div>
					) }
				/>
			</Toolbar>
		</BlockFormatControls>
	);
}
