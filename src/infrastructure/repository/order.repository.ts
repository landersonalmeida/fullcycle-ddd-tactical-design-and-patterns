import { Sequelize } from 'sequelize'
import Order from '../../domain/entity/order'
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'
import OrderItem from '../../domain/entity/order_item'

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    )

    for (const item of entity.items) {
      await OrderItemModel.upsert(
        {
          id: item.id,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        }
      )
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: ['items'],
      })
    } catch (error) {
      throw new Error("Order not found")
    }

    const order = new Order(
      id,
      orderModel.customer_id,
      orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    )
    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] })

    const orders = orderModels.map(orderModel => new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    ))
    return orders
  }
}