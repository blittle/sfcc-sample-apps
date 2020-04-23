import Link from 'next/link';
import { getApolloClient } from '../../apollo/client';
import gql from 'graphql-tag';

import ProductDetail from '../../components/ProductDetail/ProductDetail';
import Layout from '../../components/Layout';

const ProductQuery = gql`
    query($productId: String!, $selectedColor: String) {
        product(id: $productId, selectedColor: $selectedColor) {
            name
            id
            masterId
            longDescription
            shortDescription
            currency
            price
            prices {
                sale
                list
            }
            image
            images(allImages: true, size: "large") {
                title
                alt
                link
            }
            variants {
                id
                variationValues {
                    key
                    value
                }
            }
            variationAttributes {
                variationAttributeType {
                    id
                    name
                }
                variationAttributeValues {
                    name
                    value
                    orderable
                    swatchImage {
                        link
                        style
                    }
                }
            }
            inventory {
                ats
                backorderable
                id
                orderable
                preorderable
                stockLevel
            }
            type {
                bundle
                item
                master
                option
                set
                variant
                variationGroup
            }
            productPromotions {
                calloutMsg
                promotionId
                promotionalPrice
            }
        }
    }
`;

export default function Product({ resp }) {
    if (resp && resp.data && resp.data.product) {
        if (!resp.data.product) console.log('die');
        return (
            <Layout>
                <ProductDetail product={resp.data.product} />
            </Layout>
        );
    }

    return <h1>hi</h1>;
}

export const getStaticPaths = async () => {
    const ids = [
        '25592581M',
        '25752981M',
        '25762732M',
        '25553417M',
        '25686514M',
        '25720044M',
    ];
    return { paths: ids.map(id => ({ params: { id } })), fallback: true };
};

export const getStaticProps = async ({ params }) => {
    const client = getApolloClient();

    const resp = await client.query({
        query: ProductQuery,
        variables: {
            productId: params?.id,
        },
    });

    return { props: { resp } };
};
