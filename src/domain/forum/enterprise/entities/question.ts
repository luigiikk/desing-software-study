import { Slug } from './value-objects/slug'
import dayjs from 'dayjs'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { Aggregateroot } from '@/core/entities/aggregate-root'
import type { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  attachments: QuestionAttachment[]
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Aggregateroot<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }
  get bestAnswerId() {
    return this.props.bestAnswerId
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updatedAt() {
    return this.props.updatedAt
  }
  get title() {
    return this.props.title
  }
  get slug() {
    return this.props.slug
  }
  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }
  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }
  get attachments() {
    return this.props.attachments
  }
  
  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }
  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }
  private touch() {
    this.props.updatedAt = new Date()
  }
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? [],
      },
      id
    )

    return question
  }
}
