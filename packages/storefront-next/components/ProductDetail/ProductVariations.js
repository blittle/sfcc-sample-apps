import * as React from 'react';
import styles from './ProductVariations.module.css';

const DEFAULT_COLOR_TEXT = 'Not Selected';

export default function ProductVariations({
    variations,
    variationAttributes,
    inventory,
    updateProductDetails,
}) {
    const colorAttribute = getColorAttribute(variationAttributes);
    const sizeAttribute = getSizeAttribute(variationAttributes);
    const qtyValues = getQuantityValues(inventory);

    const [selectedColorText, setSelectedColorText] = React.useState(
        DEFAULT_COLOR_TEXT,
    );

    function toggleSwatch() {}

    function handleSize() {}

    function updateSelectQty() {}

    return (
        <div className={styles.variations}>
            {colorAttribute ? (
                <div className={styles.colorSwatches}>
                    <div className="row">
                        <div className="col-12">
                            <p className="small-paragraph">
                                {colorAttribute.name}: {selectedColorText}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {getColorAttributeValues(variationAttributes).map(
                            colorAttributeValue =>
                                colorAttributeValue.orderable ? (
                                    <div
                                        className="col-auto swatch"
                                        key={colorAttributeValue.value}
                                    >
                                        <button
                                            className="color-swatch"
                                            data-color-name={
                                                colorAttributeValue.name
                                            }
                                            data-color-value={
                                                colorAttributeValue.value
                                            }
                                            data-color-swatch={
                                                colorAttributeValue.swatchImage
                                                    .link
                                            }
                                            style={getStyle(
                                                colorAttributeValue.swatchImage
                                                    .style,
                                            )}
                                            onClick={toggleSwatch}
                                        ></button>
                                    </div>
                                ) : null,
                        )}
                    </div>
                </div>
            ) : null}

            <div className={`row ${styles.dropdowns}`}>
                {sizeAttribute ? (
                    <div className="col">
                        <label className="small-paragraph">
                            {sizeAttribute.name}
                        </label>
                        <select className="form-control" onChange={handleSize}>
                            <option data-size-value="-">-</option>
                            {getSizeAttributeValues(variationAttributes).map(
                                sizeAttributeValue => (
                                    <option
                                        key={sizeAttributeValue.value}
                                        data-size-name={sizeAttributeValue.name}
                                        data-size-value={
                                            sizeAttributeValue.value
                                        }
                                        data-size-orderable={
                                            sizeAttributeValue.orderable
                                        }
                                    >
                                        {sizeAttributeValue.name}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                ) : null}
                <div className="col">
                    <label className="small-paragraph">Quantity</label>
                    <select className="form-control" onChange={updateSelectQty}>
                        {qtyValues.map(qtyValue => (
                            <option value={qtyValue} key={qtyValue}>
                                {qtyValue}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

function getColorAttribute(variationAttributes) {
    let colorAttribute = null;
    if (variationAttributes && variationAttributes.length) {
        colorAttribute = variationAttributes.find(
            variationAttribute =>
                variationAttribute.variationAttributeType.id === 'color',
        );
    }
    if (colorAttribute) {
        return colorAttribute.variationAttributeType;
    }
    return null;
}

function getColorAttributeValues(variationAttributes) {
    let colorAttributeValues = [];
    if (variationAttributes && variationAttributes.length) {
        colorAttributeValues = variationAttributes.find(
            variationAttribute =>
                variationAttribute.variationAttributeType.id === 'color',
        ).variationAttributeValues;
    }
    return colorAttributeValues;
}

function getSizeAttribute(variationAttributes) {
    let sizeAttribute = null;
    if (variationAttributes && variationAttributes.length) {
        sizeAttribute = variationAttributes.find(
            variationAttribute =>
                variationAttribute.variationAttributeType.id === 'size',
        );
    }
    if (sizeAttribute) {
        return sizeAttribute.variationAttributeType;
    }
    return null;
}

function getSizeAttributeValues(variationAttributes) {
    let sizeAttributeValues = [];
    if (variationAttributes && variationAttributes.length) {
        sizeAttributeValues = variationAttributes.find(
            variationAttribute =>
                variationAttribute.variationAttributeType.id === 'size',
        ).variationAttributeValues;
    }
    return sizeAttributeValues;
}

function getQuantityValues(inventory) {
    const maxQtyValue = 10;

    let newAtsValue = inventory ? inventory.ats : null;
    if (inventory && inventory.ats >= maxQtyValue) {
        newAtsValue = maxQtyValue;
    }

    const array = [];

    const upperLimit = newAtsValue ? newAtsValue : maxQtyValue;

    for (let i = 1; i <= upperLimit; i++) {
        array.push(i);
    }
    return array;
}

function getStyle(style) {
    return {
        background: style.substring(12, style.length - 1),
    };
}
