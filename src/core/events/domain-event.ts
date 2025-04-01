import type { UniqueEntityID } from '../entities/unique-entity-id'

export interface DomainEvent {
  occuredAt: Date
  getAggregateId(): UniqueEntityID
}
