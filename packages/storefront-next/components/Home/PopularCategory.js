import * as React from 'react';
import styles from './PopularCategory.module.css';
import Link from 'next/link';

export default function PopularCategory({
    categoryImageSrc,
    categoryLink,
    categoryName,
}) {
    return (
        <div className="row">
            <div className="col-12">
                <div className={styles.imageCropper}>
                    <Link href={categoryLink}>
                        <a>
                            <img
                                src={categoryImageSrc}
                                className={styles.imageWrapper}
                            />
                            <span
                                role="img"
                                aria-label={categoryName}
                                className="background-image"
                            ></span>
                        </a>
                    </Link>
                </div>
                <div
                    className={`${styles.popularCategoryLink} d-flex justify-content-center`}
                >
                    <Link href={categoryLink}>
                        <a className="popular-category-label-a popular-cat-link">
                            {categoryName}
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
