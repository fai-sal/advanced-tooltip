/**
 * Internal dependencies
 */
import icon from '../../formats/tool-tip/icon';
/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import {
	Dropdown,
	IconButton,
	TextareaControl,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

const TOOLTIPSTYLE = {
	width: '260px',
	padding: '14px',
};
const INPUTSTYLE = {
	marginBottom: '10px',
	width: '100%',
	display: 'block',
};

/**
 * Adding Tooltip option to block toolbar
 *
 * @param {JSX} BlockEdit Block's editor element.
 *
 * @return {JSX} Element to render.
 */
const Tooltip = ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes } = props;
		const [ toolTipText, setToolTipText ] = useState( attributes.tooltip );

		if ( props.name !== 'core/image' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockControls>
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
								onClick={ onToggle }
								style={ { height: '100%' } }
								className={
									attributes.tooltip
										? 'is-pressed'
										: 'inactive'
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
									label={ __(
										'Tooltip Text',
										'guten-tooltip'
									) }
									value={ toolTipText }
									onChange={ ( nextValue ) =>
										setToolTipText( nextValue ?? '' )
									}
								/>

								<Button
									variant="primary"
									onClick={ () => {
										setAttributes( {
											tooltip: toolTipText,
										} );
										onToggle();
									} }
								>
									{ __( 'Add', 'guten-tooltip' ) }
								</Button>
							</div>
						) }
					/>
				</BlockControls>

				<BlockEdit { ...props } />
			</>
		);
	};
};

addFilter( 'editor.BlockEdit', 'guten-tooltip', Tooltip );

/**
 * Add additional attributes to core/image block.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} Modified settings.
 */
function addAttribute( settings ) {
	if ( settings.name !== 'core/image' ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		tooltip: {
			type: 'string',
		},
	};
	return settings;
}

addFilter( 'blocks.registerBlockType', 'guten-tooltip', addAttribute );

/**
 * Adding extra attributes to front-end.
 *
 * @param {Object} props      Block props.
 * @param {Object} blockType  Block Category information
 * @param {Object} attributes Block's attributes.
 *
 * @return {Object} Modified settings.
 */
const addToolTip = ( props, blockType, attributes ) => {
	if ( blockType.name !== 'core/image' ) {
		return props;
	}

	/**
	 * Specific to core/image block
	 */
	if ( attributes.tooltip ) {
		return {
			...props,
			'data-tooltip': attributes.tooltip,
		};
	}

	return props;
};
addFilter( 'blocks.getSaveContent.extraProps', 'guten-tooltip', addToolTip );

/**
 * Adding Extra data-attibute to core/image block's editor.
 */
const addTooltip = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { wrapperProps, block, name, attributes } = props;

		if ( name !== 'core/image' ) {
			return (
				<BlockListBlock { ...props } wrapperProps={ wrapperProps } />
			);
		}

		const newWrapperProps = {
			...wrapperProps,
			...( attributes.tooltip && {
				'data-tooltip-info': block.attributes.tooltip,
			} ),
		};

		return <BlockListBlock { ...props } wrapperProps={ newWrapperProps } />;
	};
}, 'withTooltip' );

wp.hooks.addFilter( 'editor.BlockListBlock', 'guten-tooltip', addTooltip );
