import type { AnswerRepository } from '../repositories/answer-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  commentAnswer: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}
  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const commentAnswer = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(commentAnswer)

    return {
      commentAnswer,
    }
  }
}
