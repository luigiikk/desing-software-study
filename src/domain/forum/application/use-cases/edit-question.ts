import { left, right, type Either } from '@/core/either'
import type { QuestionRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { NotAllowedError } from './errors/not-allowed-error'
import type { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  {}
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new ResourceNotFoundError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments
    )

    const questionAttachments = attachmentsIds.map(attachmentsIds => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.save(question)

    return right({})
  }
}
