import { right, type Either } from '@/core/either'
import type { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  { questions: Question[] }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({ questions })
  }
}
