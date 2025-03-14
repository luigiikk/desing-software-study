import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase
describe('Create Answer use case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      content: 'Novo conteudo',
      questionId: '1'
    })

    expect(answer.id).toBeTruthy()
  })
})
