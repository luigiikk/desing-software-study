import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(commentAnswer: AnswerComment ): Promise<void>
}
