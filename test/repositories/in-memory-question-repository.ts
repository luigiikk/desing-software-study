import type { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}
