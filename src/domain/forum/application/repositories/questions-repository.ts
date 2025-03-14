import type { Question } from "../../enterprise/entities/question";


export interface QuestionRepository {
  create(anser: Question): Promise<void>
}