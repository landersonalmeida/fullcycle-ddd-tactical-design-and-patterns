import EventDispatcher from '../event/@shared/event-dispatcher'
import CustomerAddressChangedEvent from '../event/customer/customer-address-changed.event'
import CustomerCreatedEvent from '../event/customer/customer-created.event'
import EnviaConsoleLog1Handler from '../event/customer/handler/envia-console-log-1-handler.handler'
import EnviaConsoleLog2Handler from '../event/customer/handler/envia-console-log-2-handler.handler'
import EnviaConsoleLogHandler from '../event/customer/handler/envia-console-log-handler.handler'
import Address from './address'
import Customer from './customer'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'Lan')
    }).toThrowError('Address is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('1', '')
    }).toThrowError('Name is required')
  })

  it('should change name', () => {
    const customer = new Customer('1', 'Lan')

    customer.changeName('Jane')

    expect(customer.name).toBe('Jane')
  })

  it('should notify when user address updated', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLogHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    const customer = new Customer('1', 'Customer 1')

    const newAddress = new Address('Street 1', '123', '00000-000', 'São Paulo')
    customer.changeAddress(newAddress)

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address: newAddress
    })

    eventDispatcher.notify(customerAddressChangedEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', '22', 'SP', '00000-000')
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1')
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1')

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should notify two logs when user created', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    const spyEventHandler = jest.spyOn(eventHandler1, 'handle')
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')

    eventDispatcher.register('CreatedCostumerEvent', eventHandler1)
    eventDispatcher.register('CreatedCostumerEvent', eventHandler2)

    expect(
      eventDispatcher.getEventHandlers["CreatedCostumerEvent"][0]
    ).toMatchObject(eventHandler1)

    const customerCreatedEvent = new CustomerCreatedEvent({})

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})