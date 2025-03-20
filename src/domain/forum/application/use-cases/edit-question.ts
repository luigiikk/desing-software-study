import { left, right, type Either } from '@/core/either'
import type { QuestionRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}


type EditQuestionUseCaseResponse = Either<
ResourceNotFoundError | NotAllowedError,
// biome-ignore lint/complexity/noBannedTypes: <explanation>
{}
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new ResourceNotFoundError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({})
  }
}
