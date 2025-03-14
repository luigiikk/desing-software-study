import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

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

    return {
      question,
    }
  }
}
