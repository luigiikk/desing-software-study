import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import type { AnswerRepository } from '@/repositories/answer-repository'
import type { Answer } from '../entities/answer'

const testAnswersRepository: AnswerRepository = {
  create: async (anser: Answer) => {
    
    return;
  }
}
test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(testAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova Resposta'
  })

  expect(answer.content).toEqual('Nova Resposta')
})