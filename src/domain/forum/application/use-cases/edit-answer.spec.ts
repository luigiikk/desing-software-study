import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase
describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      title: 'new title',
      content: 'new content',
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryAnswerRepository.items[0].content).toBe('new content')
  })

  it('should not be able to edit answer fro manother user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'new titler',
        content: 'new content',
        answerId: newAnswer.id.toValue(),
      })
    }).rejects.toThrow('You are not allower to edit this answer')
  })
})
