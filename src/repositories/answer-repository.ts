import type { Answer } from "../domain/entities/answer";

export interface AnswerRepository {
  create(anser: Answer): Promise<void>
}