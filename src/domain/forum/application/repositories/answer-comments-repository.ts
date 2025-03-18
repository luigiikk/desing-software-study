import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(commentAnswer: AnswerComment ): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
