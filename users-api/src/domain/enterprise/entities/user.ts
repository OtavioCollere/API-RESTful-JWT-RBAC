import { Entity } from "../../../core/entities/entity";
import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

interface UserProps{
  name : string
  email : string,
  password : string
  updatedAt? : Date
  createdAt? : Date
}

export class User extends Entity<UserProps>{

  static create(props : Optional<UserProps, 'createdAt' | 'updatedAt'> , id?: string) {

    const user = new User({
      ...props,
      createdAt : props.createdAt ?? new Date()
    }, new UniqueEntityID(id));

    return user;
    
  }

  // Getters
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  // Setters (controlados)
  setName(value: string): void {
    this.props.name = value;
    this.touch();
  }

  setEmail(value: string): void {
    this.props.email = value;
    this.touch();
  }

  setPassword(value: string): void {
    this.props.password = value;
    this.touch();
  }

  // Atualiza o updatedAt
  touch(): void {
    this.props.updatedAt = new Date();
  }
}