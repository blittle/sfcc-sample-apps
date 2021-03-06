import * as React from 'react';
import styles from './ProductAvailability.module.css';

export default function ProductAvailability({
    inventory,
    type,
    quantity,
    context,
}) {
    const availabilityMessage = getAvailabilityMessage(
        inventory,
        type,
        quantity,
    );

    return (
        <div className={styles[context]}>
            <div className={`row ${styles.availability} small-paragraph`}>
                <div className={`col-4 ${styles.availabilityLabel}`}>
                    <label>Availability:</label>
                </div>
                <div className="col-8 pr-0 availability-message">
                    <ul className="list-unstyled">
                        <li>{availabilityMessage}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function getAvailabilityMessage(inventory, type, quantity) {
    // Message that will be returned and displayed
    let availabilityMessage = '';

    // If product is a master product user must select variant for availability
    const isMasterProduct = type && type.master;
    if (isMasterProduct) {
        availabilityMessage = 'Select Styles for Availability';
        return availabilityMessage;
    }

    // ATS = max(0, allocation + preorderBackorderAllocation - turnover – on-order)
    // A user could select 5 however only 2 are in stock we will want to show if the remaining 3 are on back order or
    // pre-order we will utilize stock level. Stock level is calculated below
    // StockLevel = max(0, allocation - turnover – on-order)

    if (!inventory || !inventory.ats) {
        availabilityMessage = 'This item is currently not available';
    } else {
        // Check to see if the product has perpetual inventory. OCAPI returns ats with value 9999 if product is infinite
        const isPerpetual =
            inventory && inventory.ats && inventory.ats === 9999;
        if (isPerpetual) {
            availabilityMessage = 'In Stock';
            return availabilityMessage;
        }

        // Could have multiple messages due to availability levels and back order and pre order
        const availabilityMessages = [];
        const inventoryStockLevel = inventory.stockLevel
            ? inventory.stockLevel
            : 0;
        const allocation = inventory.ats - inventoryStockLevel;
        const selectedQuantity = quantity ? quantity : 1;
        const levels = {
            inStock:
                selectedQuantity <= inventoryStockLevel
                    ? selectedQuantity
                    : inventoryStockLevel,
            preorder: 0,
            backorder: 0,
            notAvailable: 0,
        };
        let selectedQuantityLeft =
            selectedQuantity <= inventoryStockLevel
                ? 0
                : selectedQuantity - inventoryStockLevel;

        // Determine backorder levels
        if (selectedQuantityLeft && inventory.backorderable) {
            if (selectedQuantityLeft <= allocation) {
                levels.backorder = selectedQuantityLeft;
                selectedQuantityLeft = 0;
            } else {
                levels.backorder = allocation;
                selectedQuantityLeft -= allocation;
            }
        }

        // Determine pre-order levels
        if (selectedQuantityLeft && inventory.preorderable) {
            if (selectedQuantityLeft <= allocation) {
                levels.preorder = selectedQuantityLeft;
                selectedQuantityLeft = 0;
            } else {
                levels.preorder = allocation;
                selectedQuantityLeft -= allocation;
            }
        }

        levels.notAvailable = selectedQuantityLeft;

        // Determine the availability message
        if (levels.inStock > 0) {
            if (levels.inStock === selectedQuantity) {
                availabilityMessages.push('In Stock');
            } else {
                availabilityMessages.push(
                    levels.inStock + ' Item(s) In Stock.',
                );
            }
        }

        if (levels.preorder > 0) {
            if (levels.preorder === selectedQuantity) {
                availabilityMessages.push('Pre-Order');
            } else if (levels.notAvailable === 0) {
                availabilityMessages.push(
                    'The remaining items are available for pre-order.',
                );
            } else {
                availabilityMessages.push(
                    levels.preorder + ' Item(s) are available for pre-order.',
                );
            }
        }

        if (levels.backorder > 0) {
            if (levels.backorder === selectedQuantity) {
                availabilityMessages.push('Back Order');
            } else if (levels.notAvailable === 0) {
                availabilityMessages.push(
                    'The remaining items are available on back order.',
                );
            } else {
                availabilityMessages.push(
                    'Back Order' + levels.backorder + ' item(s).',
                );
            }
        }

        if (levels.notAvailable > 0) {
            if (levels.notAvailable === selectedQuantity) {
                availabilityMessages.push(
                    'This item is currently not available',
                );
            } else {
                availabilityMessages.push(
                    'The remaining items are currently not available. Please adjust the quantity.',
                );
            }
        }

        availabilityMessage = availabilityMessages.join('\n');
    }

    if (!availabilityMessage) {
        availabilityMessage = 'Select Styles for Availability';
    }

    return availabilityMessage;
}
