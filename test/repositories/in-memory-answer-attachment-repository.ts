import type { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import type { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      item => item.answerId.toString() === answerId
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      item => item.answerId.toString() !== answerId
    )

    this.items = answerAttachments
  }
}
