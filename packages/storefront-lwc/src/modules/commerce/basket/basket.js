/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
import { LightningElement, wire } from 'lwc';
import { GET_BASKET, REMOVE_ITEM_FROM_BASKET } from './gql.js';
import { useMutation, useQuery } from '@lwce/apollo-client';

export default class Basket extends LightningElement {
    products = [];
    loading = true;
    basket = {};
    shippingMethods = [];
    selectedShippingMethodId;

    @wire(useQuery, {
        query: GET_BASKET,
        lazy: false,
    })
    getBasket(response) {
        this.loading = response.loading;
        if (response.initialized) {
            this.basket = response.data.getBasket || {};
            this.shippingMethods = this.basket.shippingMethods.applicableShippingMethods;
            this.selectedShippingMethodId = this.basket.selectedShippingMethodId;
            this.shippingMethods = this.filterStorePickupShippingMethods(
                this.basket.shippingMethods.applicableShippingMethods,
            );
            this.products = [...this.basket.products];
        }
    }

    get hasProducts() {
        return this.products.length > 0;
    }

    get shippingMethods() {
        let shippingMethods = this.basket.shippingMethods
            .applicableShippingMethods;
        return this.filterStorePickupShippingMethods(shippingMethods);
    }

    filterStorePickupShippingMethods(shippingMethods) {
        // Filter/Remove all Store Pickup Enabled Shipping Methods
        var filteredMethods = [];
        shippingMethods.forEach(shippingMethod => {
            if (!shippingMethod.c_storePickupEnabled) {
                filteredMethods.push(shippingMethod);
            }
        });
        return filteredMethods;
    }

    get selectedShippingMethodId() {
        return this.basket.selectedShippingMethodId;
    }

    @wire(useMutation, {
        mutation: REMOVE_ITEM_FROM_BASKET,
        lazy: true,
    })
    removeItemFromBasket;

    removeHandler(event) {
        const itemId = event.detail.itemId;
        const variables = { itemId };
        this.removeItemFromBasket.mutate({ variables }).then(() => {
            this.basket = {
                ...this.basket,
                ...this.removeItemFromBasket.data.removeItemFromBasket,
            };
            this.products = [...this.basket.products];
        });
    }

    updateBasket(event) {
        this.basket = { ...this.basket, ...event.detail.updatedBasket };
        this.products = event.detail.updatedBasket.products;
    }
}
