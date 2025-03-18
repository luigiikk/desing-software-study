import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>
  create(commentQuestion: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
