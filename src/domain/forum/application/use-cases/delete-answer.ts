import type { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }
    
    if(authorId !== answer.authorId.toString()){
      throw new Error('You are not allower to delete this answer')
    }

    await this.answerRepository.delete(answer)

    return {}
  }
}
