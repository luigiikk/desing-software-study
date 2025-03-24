import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttachmentProps {
  titile: string
  link: string
 
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.titile
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
