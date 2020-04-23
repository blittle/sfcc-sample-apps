import * as React from 'react';
import styles from './ProductDetail.module.css';

import Collapsible from './Collapsible';
import ProductAvailabilitly from './ProductAvailability';
import ProductPrice from './ProductPrice';
import ProductVariations from './ProductVariations';

export default function ProductDetail({ product }) {
    const [activeImage, setActiveImage] = React.useState(0);
    const [readyToAddToBasket, setReadyToAddToBasket] = React.useState(false);
    const [selectedQty, setSelectedQty] = React.useState(0);

    function nextImage() {
        if (activeImage + 1 === product.images.length) {
            setActiveImage(0);
        } else {
            setActiveImage(activeImage + 1);
        }
    }

    function prevImage() {
        setActiveImage(
            activeImage === 0 ? product.images.length - 1 : activeImage - 1,
        );
    }

    function updateProductDetails() {}

    return (
        <div className={`container ${styles.productDetailPage}`}>
            <div className="row d-md-none">
                <div className="col">
                    <h3 className="float-left">{product.name}</h3>
                </div>
            </div>
            <div className="row d-md-none">
                <div className="col">
                    <p className="small-paragraph">Item No. {product.id}</p>
                </div>
            </div>

            <div className="row">
                <div className={`${styles.productImages} col-12 col-sm-6`}>
                    <div className="carousel slide" data-interval="0">
                        <div className="carousel-inner" role="listbox">
                            {product.images.map((image, index) => (
                                <div
                                    className={`carousel-item ${
                                        activeImage === index ? 'active' : ''
                                    }`}
                                    key={image.link}
                                >
                                    <img
                                        src={image.link}
                                        className="d-block img-fluid"
                                        alt={image.atl}
                                    />
                                </div>
                            ))}
                        </div>

                        <a
                            className="carousel-control-prev"
                            role="button"
                            data-slide="prev"
                        >
                            <span
                                className="fa icon-prev"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            role="button"
                            data-slide="next"
                        >
                            <span
                                className="fa icon-next"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                <div className="col-12 col-sm-6">
                    <div className="row">
                        <div className="col">
                            <h3 className="float-left hidden-sm-down">
                                {product.name}
                            </h3>
                        </div>
                    </div>

                    <div className="row justify-content-between">
                        <div className="col-auto mr-auto hidden-xs-down small-paragraph">
                            Item No.
                            <span> {product.id}</span>
                        </div>

                        <div className="col-auto">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>

                    <ProductVariations
                        updateProductDetails={updateProductDetails}
                        variations={product.variations}
                        variationAttributes={product.variationAttributes}
                        inventory={product.inventory}
                    ></ProductVariations>

                    <ProductAvailabilitly
                        inventory={product.inventory}
                        type={product.type}
                        quantity={selectedQty}
                        context="pdp"
                    ></ProductAvailabilitly>

                    {/* <template if:true={product.productPromotions}>
                    <div className="promotions">
                        <template for:each={product.productPromotions} for:item="promotion">
                            <commerce-promotion
                                    key={promotion.promotionId}
                                    promotion={promotion}>
                            </commerce-promotion>
                        </template>
                    </div>
                </template> */}

                    <div className="row">
                        <div className="col-12">
                            <ProductPrice
                                product={product}
                                context="pdp"
                            ></ProductPrice>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <button
                                        className={`btn btn-primary btn-block ${styles.button}`}
                                        disabled={!readyToAddToBasket}
                                    >
                                        <i
                                            className={`fa fa-shopping-bag ${styles.shoppingBag}`}
                                        ></i>
                                        Add to basket
                                    </button>
                                    {/* <commerce-toastmessage
                                    success={addToBasketSucceed}
                                    show={showToast}
                                    ontoastdisplayed={toastMessageDisplayed}
                                    successmessage="Product added to cart successfully"
                                    failmessage="Product could not be added to cart"
                                ></commerce-toastmessage> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptions}>
                <Collapsible title="Description">
                    {product.shortDescription}
                </Collapsible>
                <Collapsible title="Details">
                    {product.longDescription}
                </Collapsible>
            </div>
        </div>
    );
}
