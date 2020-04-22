import * as React from 'react';
import styles from './Banner.module.css';

export default function Banner({
    bannerLink,
    bannerImageSrc,
    bannerImageAlt,
    bannerImageTitle,
    bannerTitle,
    bannerText,
}) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 px-0">
                    <lwce-link href={bannerLink}>
                        <img
                            className={`${styles.imageHero} common-image-filter`}
                            src={bannerImageSrc}
                            alt={bannerImageAlt}
                            title={bannerImageTitle}
                        />
                        <div
                            className={`${styles.heroBannerText} text-sm-left text-center`}
                        >
                            <h1>{bannerTitle}</h1>
                            <p>{bannerText}</p>
                        </div>
                    </lwce-link>
                </div>
            </div>
        </div>
    );
}
