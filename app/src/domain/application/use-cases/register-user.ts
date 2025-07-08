import { makeLeft, makeRight, type Either } from "@/core/types/either";
import { User } from "@/domain/enterprise/entities/user";
import type { UsersRepository } from "../repositories/users-repository";
import { EmailAlreadyExistsError } from "@/core/error/errors/email-already-exists-error";
import type { HashGenerator } from "../cryptography/hash-generator";

interface RegisterUserUseCaseRequest{
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

export class RegisterUserUseCase{

  constructor(
    private usersRepository : UsersRepository,
    private hashGenerator : HashGenerator
  ) {}

  async execute( { name, email, password } : RegisterUserUseCaseRequest ) : Promise<RegisterUserUseCaseResponse> {

    const emailExists = await this.usersRepository.findByEmail(email);

    if ( emailExists ) 
    {
      return makeLeft(new EmailAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password);

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