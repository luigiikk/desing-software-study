import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'


let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase
describe('Send Notification use case', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Titulo',
      content: 'Nova Resposta',
    })
    expect(result.isRight()).toBe(true)
  })
})
