import type { AnswerRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  title: string
  content: string
}

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    authorId,
    answerId,
    title,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not allower to edit this answer')
    }
    answer.content = content

    await this.answerRepository.save(answer)

    return {}
  }
}
