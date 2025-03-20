import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/questions-repository'
import { right, type Either } from '@/core/either'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<null, { question: Question }>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    await this.questionRepository.create(question)

    return right({ question })
  }
}
