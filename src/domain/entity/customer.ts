import EventDispatcher from '../event/@shared/event-dispatcher'
import CustomerAddressChangedEvent from '../event/customer/customer-address-changed.event'
import CustomerCreatedEvent from '../event/customer/customer-created.event'
import EnviaConsoleLog1Handler from '../event/customer/handler/envia-console-log-1-handler.handler'
import EnviaConsoleLog2Handler from '../event/customer/handler/envia-console-log-2-handler.handler'
import EnviaConsoleLogHandler from '../event/customer/handler/envia-console-log-handler.handler'
import Address from './address'

export default class Customer {
  private _id: string
  private _name: string = ""
  private _address!: Address
  private _active: boolean = true
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get Address(): Address {
    return this._address
  }

  validate() {
    if (this._id.length == 0) {
      throw new Error("Address is required")
    }
    if (this._name.length == 0) {
      throw new Error("Name is required")
    }
  }

  changeName(name: string) {
    this._name = name
  }

  changeAddress(address: Address) {
    this._address = address

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLogHandler()

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: this._address,
    })

    eventDispatcher.notify(customerAddressChangedEvent)
  }

  activate() {
    if (this._address == undefined) {
      throw new Error("Address is mandatory to activate a customer")
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  isActive() {
    return this._active
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  set Address(address: Address) {
    this._address = address
  }
}