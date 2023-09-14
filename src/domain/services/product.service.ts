import Product from '../entity/product'

export default class ProductService {
  static increasePrice(products: Product[], amount: number): Product[] {
    products.forEach(product => {
      product.changePrice((product.price * amount) / 100 + product.price)
    })
    return products
  }
}