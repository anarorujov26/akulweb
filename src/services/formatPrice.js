export function formatPrice(priceStr) {
    let price = parseFloat(priceStr);

    price = Math.round(price * 100000) / 100000;
    price = parseFloat(price.toFixed(5));

    price = Math.round(price * 10000) / 10000;

    if (price % 1 === 0) {
        return parseFloat(price.toFixed(2));
    }

    return price;
}