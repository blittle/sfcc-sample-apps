import * as React from 'react';
import styles from './ShopCategory.module.css';

export default function ShopCategory({ shopCategoryHeading }) {
    return (
        <div className="container-fluid">
            <div
                className={`row ${styles.shopCategoryComponent} justify-content-center`}
            >
                <div
                    className={`col-auto ${styles.shopCategoryHeader} text-center mw-100 m-auto`}
                >
                    <h3>{shopCategoryHeading}</h3>
                </div>
                <div className={`mw-100 m-auto`}>
                    <div className="row">
                        <div
                            className={`col-auto m-auto text-center mw-100 text-truncate ${styles.shopCategoryLabel}`}
                        >
                            <a
                                href="/search/Tops"
                                id="tops"
                                className={styles.shopCategoryLabelA}
                            >
                                Women
                            </a>
                        </div>
                        <div
                            className={`col-auto m-auto text-center mw-100 text-truncate ${styles.shopCategoryLabel}`}
                        >
                            <a
                                href="/search/mens"
                                id="mens"
                                className={styles.shopCategoryLabelA}
                            >
                                Men
                            </a>
                        </div>
                        <div
                            className={`col-auto m-auto text-center mw-100 text-truncate ${styles.shopCategoryLabel}`}
                        >
                            <a
                                href="/search/shoes"
                                id="womens-accessories-shoes"
                                className={styles.shopCategoryLabelA}
                            >
                                Shoes
                            </a>
                        </div>
                        <div
                            className={`col-auto m-auto text-center mw-100 text-truncate ${styles.shopCategoryLabel}`}
                        >
                            <a
                                href="/search/scarves"
                                id="womens-accessories-scarves"
                                className={styles.shopCategoryLabelA}
                            >
                                Scarves
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
