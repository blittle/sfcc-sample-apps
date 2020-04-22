import * as React from 'react';
import Banner from './Banner';
import ShopCategory from './ShopCategory';
import PopularCategory from './PopularCategory';

export default function Home() {
    return (
        <div role="main" id="maincontent">
            <Banner
                bannerTitle="Summer Look"
                bannerText="Shop Now"
                bannerLink="/search/Tops"
                bannerImageSrc="/images/homepage/heroImage.jpg"
                bannerImageAlt="Hero Banner Image"
                bannerImageTitle="hero Banner Image"
            ></Banner>

            <ShopCategory shopCategoryHeading="Shop Category"></ShopCategory>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3
                            style={{
                                marginTop: '1.25rem',
                                marginBottom: '1.25rem',
                            }}
                        >
                            Popular Catalogs
                        </h3>
                        <div className="row justify-content-center">
                            <div className="col-4 col-sm-2  popular-category">
                                <PopularCategory
                                    categoryName="Dresses"
                                    categoryLink="/products/25592581M"
                                    categoryImageSrc="/images/homepage/women.jpg"
                                ></PopularCategory>
                            </div>

                            <div className="col-4 col-sm-2  popular-category">
                                <PopularCategory
                                    categoryName="Ties"
                                    categoryLink="/products/25752981M"
                                    categoryImageSrc="/images/homepage/tie.jpg"
                                ></PopularCategory>
                            </div>

                            <div className="col-4 col-sm-2  popular-category">
                                <PopularCategory
                                    categoryName="Coats"
                                    categoryLink="/products/25762732M"
                                    categoryImageSrc="/images/homepage/coat.jpg"
                                ></PopularCategory>
                            </div>

                            <div className="col-4 col-sm-2  popular-category">
                                <PopularCategory
                                    categoryName="Skirts"
                                    categoryLink="/products/25553417M"
                                    categoryImageSrc="/images/homepage/skirt.jpg"
                                ></PopularCategory>
                            </div>

                            <div className="col-4 col-sm-2  popular-category">
                                <PopularCategory
                                    categoryName="Jackets &amp; Suits"
                                    categoryLink="/products/25686514M"
                                    categoryImageSrc="/images/homepage/suit.jpg"
                                ></PopularCategory>
                            </div>

                            <div className="col-4 col-sm-2  popular-category">
                                <PopularCategory
                                    categoryName="Necklaces"
                                    categoryLink="/products/25720044M"
                                    categoryImageSrc="/images/homepage/jewelry.jpg"
                                ></PopularCategory>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <commerce-banner-image-and-text
                banner-title-l1="Dresses"
                banner-title-l2="for"
                banner-title-l3="Besties"
                banner-text="Shop Now"
                banner-image-src="/images/homepage/shopNowImage.jpg"
                banner-image-alt="Shop Now Image"
                banner-image-title="Shop Now Image"
                banner-link="/search/Dresses"
            ></commerce-banner-image-and-text>
        </div>
    );
}
