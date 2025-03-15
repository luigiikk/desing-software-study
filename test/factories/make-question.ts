import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},

  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      title: 'Example question',

      slug: Slug.create('example-question'),

      authorId: new UniqueEntityID(),

      content: 'Example quesiton content',

      ...override,
    },
    id
  )

  return question
}
