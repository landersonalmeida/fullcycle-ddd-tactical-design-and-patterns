import EventDispatcherInterface from './event-dispatcher.interface'
import EventHandlerInterface from './event-handler.interface'
import EventInterface from './event.interface'

type EventHandler = {
  [eventName: string]: EventHandlerInterface<EventInterface>[]
}

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: EventHandler = {}

  get getEventHandlers(): EventHandler {
    return this.eventHandlers
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name
    if (!this.eventHandlers[eventName]) return

    this.eventHandlers[eventName].forEach(eventHandler => {
      eventHandler.handle(event)
    })
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) return

    const index = this.eventHandlers[eventName].indexOf(eventHandler)
    if (index !== -1) {
      this.eventHandlers[eventName].splice(index, 1)
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }
}