import { left, right, type Either } from '@/core/either'
import type { AnswerRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import type { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { AnswerAttachmentsRepository } from '../repositories/answer-attachment-repository'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  title: string
  content: string
  attachmentIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  {}
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}
  async execute({
    authorId,
    answerId,
    title,
    content,
    attachmentIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new ResourceNotFoundError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    )

    const answerAttachments = attachmentIds.map(attachmentIds => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentIds),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answerRepository.save(answer)

    return right({})
  }
}
