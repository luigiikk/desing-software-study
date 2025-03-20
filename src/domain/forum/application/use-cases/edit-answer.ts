import { left, right, type Either } from '@/core/either'
import type { AnswerRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { NotAllowedError } from './errors/not-allowed-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  title: string
  content: string
}


type EditAnswerUseCaseResponse  = Either<
ResourceNotFoundError | NotAllowedError,
// biome-ignore lint/complexity/noBannedTypes: <explanation>
{}
>

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
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new ResourceNotFoundError())
    }
    answer.content = content

    await this.answerRepository.save(answer)

    return right({})
  }
}
