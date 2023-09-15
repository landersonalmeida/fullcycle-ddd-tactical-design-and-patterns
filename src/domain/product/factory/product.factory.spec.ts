import { ProductFactory } from './product.factory'

describe('Product factory unit test', () => {
  it('should create a new product type a', () => {
    const product = ProductFactory.create('a', 'Product A', 10)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(10)
  })

  it('should create a new product type b', () => {
    const product = ProductFactory.create('b', 'Product B', 2)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(2)
  })

  it('should throw an error when type is invalid', () => {
    expect(() => {
      ProductFactory.create('c', 'Product C', 10)
    }).toThrowError('Product type not supported')
  })
})