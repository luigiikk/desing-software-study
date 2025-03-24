import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/questions-repository'
import { right, type Either } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })
    const questionAttachment = attachmentsIds.map(attachmentsIds => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        questionId: question.id,
      })
    })

    question.attachments = questionAttachment

    await this.questionRepository.create(question)

    return right({ question })
  }
}
