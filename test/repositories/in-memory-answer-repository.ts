import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = this.items.find(item => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items.splice(itemIndex, 1)
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items[itemIndex] = answer
  }
}
