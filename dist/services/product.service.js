"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static increasePrice(products, amount) {
        products.forEach(product => {
            product.changePrice((product.price * amount) / 100 + product.price);
        });
        return products;
    }
}
exports.default = ProductService;
