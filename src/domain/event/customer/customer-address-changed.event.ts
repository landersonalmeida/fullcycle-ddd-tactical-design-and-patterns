import EventInterface from '../@shared/event.interface'

export default class CustomerAddressChangedEvent implements EventInterface {
  constructor(
    public readonly eventData: any,
    public readonly dateTimeOcurred: Date = new Date(),
  ) { }
}