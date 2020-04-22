/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
'use strict';

const Product = require('../models/Product');
const { getCommerceClientConfig } = require('@sfcc-core/apiconfig');
const CommerceSdk = require('commerce-sdk');
const {
    getSessionFromContext,
    requestWithTokenRefresh,
} = require('@sfcc-core/core-graphql');

const getProductClient = async (config, context, refresh) => {
    const clientConfig = getCommerceClientConfig(config);
    clientConfig.headers.authorization = (
        await getSessionFromContext(config, context, refresh)
    ).token;
    return new CommerceSdk.Product.ShopperProducts(clientConfig);
};

const getProductDetail = async (config, id, context) => {
    return requestWithTokenRefresh(async refresh => {
        // clear any basketId when we get a new shopper token.
        const productClient = await getProductClient(config, context, refresh);
        return productClient.getProduct({
            parameters: {
                id: id,
                allImages: true,
            },
        });
    });
};

exports.resolver = config => {
    return {
        Query: {
            product: async (_, { id, selectedColor }, context) => {
                const apiProduct = await getProductDetail(config, id, context);
                return new Product(apiProduct, selectedColor);
            },
        },
    };
};
