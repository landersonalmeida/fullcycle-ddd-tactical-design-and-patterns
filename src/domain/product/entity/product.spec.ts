import Product from './product'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'name', 10)
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('p1', '', 10)
    }).toThrowError('Name is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('p1', 'Name', 0)
    }).toThrowError('Price must be greater than 0')
  })

  it('should change name', () => {
    const product = new Product('p1', 'Name', 100)

    product.changeName('New Name')

    expect(product.name).toBe('New Name')
  })

  it('should change price', () => {
    const product = new Product('p1', 'Name', 100)

    product.changePrice(150)

    expect(product.price).toBe(150)
  })
})