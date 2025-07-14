import { Entity } from "@/core/entities/entity"
import type { UniqueEntityID } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/types/optional"


interface UserProps {
  name : string
  email : string
  password : string
  createdAt? : Date
  updatedAt? : Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touchUpdatedAt()
  }

  get email() {
    return this.props.email
  }

  set email(value: string) {
    this.props.email = value
    this.touchUpdatedAt()
  }

  get password() {
    return this.props.password
  }

  set password(value: string) {
    this.props.password = value
    this.touchUpdatedAt()
  }

  get createdAt() {
    return this.props.createdAt!
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touchUpdatedAt() {
    this.props.updatedAt = new Date()
  }

  static create(props : Optional<UserProps, 'createdAt' | 'updatedAt'>, id? : UniqueEntityID) {
    const user = new User({
      ...props,
      createdAt : props.createdAt ?? new Date()
    } , id)

    return user
  }
}