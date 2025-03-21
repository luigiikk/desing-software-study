import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find(item => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }
  async findManyByAnswerId(answerId: string, params: PaginationParams) {
    const answerComments = this.items
      .filter(item => item.answerId.toString() === answerId)
      .slice((params.page - 1) * 20, params.page * 20)

    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.items.findIndex(
      item => item.id === answerComment.id
    )

    this.items.splice(answerCommentIndex, 1)
  }
}
