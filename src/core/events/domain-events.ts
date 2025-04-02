import type { Aggregateroot } from '../entities/aggregate-root';
import type { UniqueEntityID } from '../entities/unique-entity-id';
import type { DomainEvent } from './domain-event';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DomainEventCallback = (event: any) => void;

export class DomainEvents {
  private constructor() {}
  
  private static handlersMap: Record<string, DomainEventCallback[]> = {};
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private static markedAggregates: Aggregateroot<any>[] = [];

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public static markAggregateForDispatch(aggregate: Aggregateroot<any>) {
    const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      DomainEvents.markedAggregates.push(aggregate);
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private static dispatchAggregateEvents(aggregate: Aggregateroot<any>) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    aggregate.domainEvents.forEach((event: DomainEvent) => DomainEvents.dispatch(event));
  }

  private static removeAggregateFromMarkedDispatchList(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    aggregate: Aggregateroot<any>
  ) {
    const index = DomainEvents.markedAggregates.findIndex(a => a.equals(aggregate));

    if (index !== -1) {
      DomainEvents.markedAggregates.splice(index, 1);
    }
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): Aggregateroot<any> | undefined {
    return DomainEvents.markedAggregates.find(aggregate => aggregate.id.equals(id));
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = DomainEvents.findMarkedAggregateByID(id);

    if (aggregate) {
      DomainEvents.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      DomainEvents.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string
  ) {
    if (!(eventClassName in DomainEvents.handlersMap)) {
      DomainEvents.handlersMap[eventClassName] = [];
    }

    DomainEvents.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers() {
    DomainEvents.handlersMap = {};
  }

  public static clearMarkedAggregates() {
    DomainEvents.markedAggregates = [];
  }

  public static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name;

    if (eventClassName in DomainEvents.handlersMap) {
      const handlers = DomainEvents.handlersMap[eventClassName];
      
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}