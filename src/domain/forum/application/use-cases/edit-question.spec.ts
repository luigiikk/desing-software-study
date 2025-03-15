import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase
describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'new title',
      content: 'new content',
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].title).toBe('new title')
  })

  it('should not be able to edit question fro manother user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'new titler',
        content: 'new content',
        questionId: newQuestion.id.toValue(),
      })
    }).rejects.toThrow('You are not allower to edit this question')
  })
})
