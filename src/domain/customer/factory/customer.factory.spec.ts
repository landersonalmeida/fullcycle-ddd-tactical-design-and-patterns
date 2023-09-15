import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('Customer factory unit tests', () => {
  it('should create a customer', () => {
    let customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.Address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address('Street', '1', 'SP', '00000-000')
    let customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.Address).toBeDefined()
    expect(customer.Address.street).toBe('Street')
    expect(customer.Address.number).toBe('1')
    expect(customer.Address.city).toBe('SP')
    expect(customer.Address.zip).toBe('00000-000')
  })
})