import { v4 as uuid } from 'uuid'
import Product from '../entity/product'

export class ProductFactory {
  static create(type: string, name: string, price: number) {
    switch (type) {
      case 'a':
        return new Product(uuid(), name, price)
      case 'b':
        return new Product(uuid(), name, price)
      default:
        throw new Error('Product type not supported')
    }
  }
}