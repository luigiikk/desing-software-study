import { randomUUID } from "node:crypto"
import type { Slug } from "./value-objectss/slug"
import { Entity } from "../../core/entities/entity"

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string 
}

export class Question extends Entity<QuestionProps> {  
}