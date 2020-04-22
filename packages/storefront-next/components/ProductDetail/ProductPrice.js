import * as React from 'react';
import styles from './ProductPrice.module.css';

export default function ProductPrice({ product, context }) {
    const listPrice = getListPrice(product);
    const salePrice = getSalesPrice(product);

    return (
        <div className={styles[context]}>
            {listPrice ? (
                <React.Fragment>
                    <span className={styles.salePrice}>${salePrice}</span>
                    {listPrice ? (
                        <span className={styles.strikeThrough}>
                            ${listPrice}
                        </span>
                    ) : null}
                </React.Fragment>
            ) : (
                <span className={styles.price}>${salePrice}</span>
            )}
        </div>
    );
}

function getListPrice(product) {
    if (product && product.prices && product.prices.list) {
        return product.prices.list.toFixed(2);
    }
    return null;
}

function getSalesPrice(product) {
    if (product && product.prices && product.prices.sale) {
        return product.prices.sale.toFixed(2);
    }
    return null;
}
