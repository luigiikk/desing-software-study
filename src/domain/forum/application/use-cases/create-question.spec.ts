import type { Question } from '../../enterprise/entities/question'
import type { QuestionRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'


const testCreateQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {
    return
  },
}
test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(testCreateQuestionRepository)

  const {question} = await createQuestion.execute({
    authorId: '1',
    title: 'Titulo',
    content: 'Nova Resposta',
  })

  expect(question.id).toBeTruthy()
})
