import { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}
  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question not found')
    }
    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('no allow to delete this comment')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
