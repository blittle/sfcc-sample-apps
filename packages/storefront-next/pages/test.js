import { withApollo } from '../apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

const ViewerQuery = gql`
    query BasketQuery {
        getBasket {
            basketId
        }
    }
`;

const Index = () => {
    const resp = useQuery(ViewerQuery);

    if (resp) {
        return (
            <div>
                Store Front
                <Link href="/products/25752981M">
                    <a>Product 1</a>
                </Link>
            </div>
        );
    }

    return null;
};

export default withApollo(Index);
