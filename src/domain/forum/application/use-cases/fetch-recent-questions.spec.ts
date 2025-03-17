import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase
describe('Fetch Recent Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date('2024, 0, 20') })
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date('2024, 0, 12') })
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date('2024, 0, 18') })
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2024, 0, 20') }),
      expect.objectContaining({ createdAt: new Date('2024, 0, 18') }),
      expect.objectContaining({ createdAt: new Date('2024, 0, 12') }),
    ])
  })
})
