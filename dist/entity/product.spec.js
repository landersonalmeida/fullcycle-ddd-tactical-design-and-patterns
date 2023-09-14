"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            new product_1.default('', 'name', 10);
        }).toThrowError('Id is required');
    });
    it('should throw error when name is empty', () => {
        expect(() => {
            new product_1.default('p1', '', 10);
        }).toThrowError('Name is required');
    });
    it('should throw error when price is less than zero', () => {
        expect(() => {
            new product_1.default('p1', 'Name', 0);
        }).toThrowError('Price must be greater than 0');
    });
    it('should change name', () => {
        const product = new product_1.default('p1', 'Name', 100);
        product.changeName('New Name');
        expect(product.name).toBe('New Name');
    });
    it('should change price', () => {
        const product = new product_1.default('p1', 'Name', 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});
