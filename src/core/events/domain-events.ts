import type { Aggregateroot } from '../entities/aggregate-root'
import type { UniqueEntityID } from '../entities/unique-entity-id'
import type { DomainEvent } from './domain-event'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DomainEventCallback = (event: any) => void

export class DomainEvents {
  private constructor() {}
  
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  private static markedAggregates: Aggregateroot<any>[] = []

  public static markAggregateForDispatch(aggregate: Aggregateroot<any>) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: Aggregateroot<any>) {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: Aggregateroot<any>
  ) {
    const index = this.markAggregateForDispatch.findIndex(a =>
      a.equal(aggregate)
    )

    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID
  ): Aggregateroot<any | undefined> {
    return this.markedAggregates.find(aggregate => aggregate.id.equals(id))
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = []
    }

    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates = []
  }

  public static dispatch(event: DomainEvents) {
    const eventClassName: string = event.constructor.name

    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    const isEventRegistered = eventClassName in this.handlersMap

    if (!isEventRegistered) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      const handlers = this.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
