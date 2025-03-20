import type { AnswerRepository } from '../repositories/answer-repository'
import type { Answer } from '../../enterprise/entities/answer'
import { right, type Either } from '@/core/either'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return right({ answers })
  }
}
