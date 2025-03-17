import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id)

    if (!question) {
      return null
    }
    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug)

    if (!question) {
      return null
    }
    return question
  }
  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
  async save(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items[itemIndex] = question
  }
}
