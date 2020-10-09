/**
 * Block dependencies
 */
// import icon from './icon';
import './editor.scss';
import './style.scss';
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { 
	RichText,
	InnerBlocks,
	URLInputButton,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} = wp.blockEditor;

const {
	Fragment
} = wp.element;

/**
 * Register block
 */
export default registerBlockType(
    'nhs-partners/partners-logos',
    {
        title: __( 'Partners Logos', 'nhs_partners' ),
        description: __( 'Add Partners Logos.', 'nhs_partners' ),
        category: 'common',
        icon: 'image-filter',
        keywords: [
            __( 'Logos Partners Links', 'nhs_partners' ),
        ],
        attributes: {
            title: {
                type: 'string',
            }
        },
        edit: props => {
            const { attributes: { title }, className, setAttributes } = props;

            const ALLOWED_BLOCKS = [ 'nhs-partners/partner-logo' ];
            const TEMPLATE = [ [ 'nhs-partners/partner-logo' ] ]

            return (
                <div className={ className }>
                	<section className="nhsuk-grid-row">
        				<div className="nhsuk-width-container">

        					<div className="nhsuk-grid__item nhsuk-grid-column-full">

        						<RichText
        							tagName="h2"
        							value={ title }
        							placeholder={ __('Add Section Title', 'nhs_partners' ) }
        							onChange={ ( title ) => setAttributes( { title } ) }
        						/>
        						<div className="nhsuk-grid-row">
				                    <InnerBlocks 
				                    	allowedBlocks={ ALLOWED_BLOCKS }
				                    	template={ TEMPLATE }
				                    	orientation="horizontal"
				                    />
				                </div>
			                </div>
		                </div>
		            </section>
                </div>
            );
        },
        save: props => {
            const { attributes: { title } } = props;
            return (
                <section className="nhsuk-grid-row">
    				<div className="nhsuk-width-container">
    					<div className="nhsuk-grid__item nhsuk-grid-column-full">

	    					<RichText.Content
	        					tagName="h2"
	        					value={ title }
	        				/>

	        				<div className="nhsuk-grid-row">
	                			<InnerBlocks.Content />
	                		</div>

	                	</div>
            		</div>
		        </section>
            );
        },
    },
);


registerBlockType(
    'nhs-partners/partner-logo',
    {
        title: __( 'Partner Logo', 'nhs_partners' ),
        description: __( 'Add Partner Logo and link to their site', 'nhs_partners' ),
        parent: ['nhs-partners/partners-logos'],
        category: 'common',
        icon: 'image-filter',
        keywords: [
            __( 'Logos', 'nhs_partners' ),
        ],
        attributes: {
            url: {
                type: 'string',
            },
            alt: {
            	type: 'string',
            	default: ' '
            },
            projectURL: {
            	type: 'string',
            }
        },
        edit: props => {
            const { attributes: { url, projectURL }, className, setAttributes } = props;
            

            const onSelectMedia = function( el ){

				setAttributes( { 
					url: el.sizes.medium ? el.sizes.medium.url : el.url,
					alt: el.alt
				} );
			};


            return [
            	<BlockControls>
					{ url && (
						<MediaReplaceFlow
							mediaURL={ url }
							allowedTypes={ [ 'image' ] }
							accept="image/*"
							onSelect={ onSelectMedia }
						/>
					) }
				</BlockControls>,
                <div className="nhsuk-grid-column-one-quarter partners">

                	<div className="logo-image">

                		{
                			url ? (

                				<img src={ url } />

                			) : (

	                			<MediaPlaceholder
									labels={ {
										title: 'Add Logo',
										instructions: __(
											'Upload an logo, or pick one from the media library.'
										),
									} }
									onSelect = { onSelectMedia }
									accept="image/*"
									allowedTypes={ [ 'image' ] }
								>
								</MediaPlaceholder>

                			)
                		}	                	

					</div>

					<URLInputButton
						url={ projectURL }
						onChange={ ( url, post ) => setAttributes( { projectURL: url } ) }
					/>

                </div>
            ];
        },
        save: props => {
            const { attributes: { url, projectURL, alt } } = props;

            function logoWrapper( url, projectURL, alt ){

            	return(

            		<Fragment>

	            	{
	            		projectURL ? (

		            		<a className="nhsuk-promo__link-wrapper" href={ projectURL } target="_blank" rel="noopener noreferrer">
		                		<img src={ url } alt={ alt } className="nhsuk-promo__img wp-post-image" />
		                	</a>

		            	) : (

		            		<img src={ url } alt={ alt } className="nhsuk-promo__img wp-post-image" />

		            	)
	            	}

	            	</Fragment>
	            );

            }

            return (
                <div className="nhsuk-grid-column-one-quarter partners">

                	{ logoWrapper( url, projectURL, alt ) }

                </div>
            );
        },
    },
);