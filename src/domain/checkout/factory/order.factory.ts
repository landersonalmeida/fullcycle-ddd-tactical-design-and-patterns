import { v4 as uuid } from 'uuid'
import Order from '../entity/order'
import OrderItem from '../entity/order_item'

type OrdemItem = {
  name: string
  productId: string
  quantity: number
  price: number
}

type OrderFactoryProps = {
  id: string
  customerId: string
  items: OrdemItem[]
}

export default class OrderFactory {
  static create({ items, id, customerId }: OrderFactoryProps): Order {
    const orderItems = items.map(item => {
      return new OrderItem(
        uuid(),
        item.name,
        item.price,
        item.productId,
        item.quantity
      )
    })

    return new Order(id, customerId, orderItems)
  }
}