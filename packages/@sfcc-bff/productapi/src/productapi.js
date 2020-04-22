/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
// Product Details
exports.productDetailsTypeDef = require('./api/schema/productDetailsTypeDef').typeDef;
exports.productDetailsResolver = require('./api/schema/productDetailsResolvers').resolver;

// Product Search
exports.productSearchTypeDef = require('./api/schema/productSearchTypeDef').typeDef;
exports.productSearchResolver = require('./api/schema/productSearchResolvers').resolver;
