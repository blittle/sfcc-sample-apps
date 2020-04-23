import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-core';
import { basketTypeDef, basketResolver } from '@sfcc-bff/basketapi';
import {
    productDetailsTypeDef,
    productDetailsResolver,
    productSearchTypeDef,
    productSearchResolver,
} from '@sfcc-bff/productapi';

import { setConfig, getConfig } from '@sfcc-core/apiconfig';
import fs from 'fs';
import path from 'path';

try {
    const config = JSON.parse(
        fs.readFileSync(path.resolve('./config.json'), { encoding: 'utf8' }),
    );
    setConfig(config);
} catch (e) {
    console.log('no config file using vars env vars')
}

console.log(getConfig());

export const schema = makeExecutableSchema({
    typeDefs: [
        gql`
            type Query {
                _empty: String
            }
            type Mutation {
                _empty: String
            }
        `,
        basketTypeDef,
        productDetailsTypeDef,
        productSearchTypeDef,
    ],
    resolvers: [
        basketResolver(getConfig()),
        productDetailsResolver(getConfig()),
        productSearchResolver(getConfig()),
    ],
});
