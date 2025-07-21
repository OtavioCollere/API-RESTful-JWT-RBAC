import { makeLeft, makeRight, type Either } from "../../../core/either/either";
import { Injectable } from "@nestjs/common";
import { EmailAlreadyExistsError } from "../../../core/errors/email-already-exists-error";
import type { UsersRepository } from "../repositories/users-repository";
import type { HashGenerator } from "../cryptograph/hash-generator";
import { User } from "../../enterprise/entities/user";


interface RegisterUserUseCaseRequest {
  name : string
  email : string
  password : string
}

type RegisterUserUseCaseResponse = Either<
EmailAlreadyExistsError,
{
  user : User
}
>

@Injectable()
export class RegisterUserUseCase{

  constructor(
    private usersRepository : UsersRepository,
    private hashGenerator : HashGenerator
  ) {}
  
  async handle({name, email, password}: RegisterUserUseCaseRequest) : Promise<RegisterUserUseCaseResponse> {

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      return makeLeft(new EmailAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password, 6);

    const user = User.create({
      name, 
      email,
      password : hashedPassword
    })

    await this.usersRepository.create(user)

    return makeRight({
      user
    })

  }

}