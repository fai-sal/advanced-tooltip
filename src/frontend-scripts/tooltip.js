/**
 * Script for Tooltip
 */
class Tooltip {
	constructor() {
		this.textToolTips = document.querySelectorAll( '.has-tooltip' );
		this.imgToolTips = document.querySelectorAll(
			'.wp-block-image[data-tooltip]'
		);

		this.allToolTips = [ ...this.textToolTips, ...this.imgToolTips ];
		this.init();
	}

	init() {
		if ( this.allToolTips?.length === 0 ) {
			return null;
		}

		this.allToolTips.forEach( ( tooltip ) => {
			tooltip.addEventListener( 'mouseover', ( event ) => {
				const domRect = event.target.getBoundingClientRect();

				if (
					window.innerHeight - domRect.bottom <
					parseInt(
						getComputedStyle( tooltip, ':before' )
							.getPropertyValue( 'height' )
							.slice( 0, -2 )
					)
				) {
					tooltip.classList.add( 'top-tooltip' );
				} else {
					tooltip.classList.remove( 'top-tooltip' );
				}
			} );
		} );
	}
}

export default Tooltip;
