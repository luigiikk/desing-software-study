import type { Answer } from "../../enterprise/entities/answer";


export interface AnswerRepository {
  create(anser: Answer): Promise<void>
}
