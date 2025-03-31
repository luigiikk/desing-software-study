import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase
describe('Fetch Recent Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    )
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

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2024, 0, 20') }),
      expect.objectContaining({ createdAt: new Date('2024, 0, 18') }),
      expect.objectContaining({ createdAt: new Date('2024, 0, 12') }),
    ])
  })
})
