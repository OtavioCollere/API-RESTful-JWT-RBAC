import { makeLeft, type Either } from "@/core/types/either";
import type { User } from "@/domain/enterprise/entities/user";
import type { UsersRepository } from "../repositories/users-repository";

interface RegisterUserUseCaseRequest{
  name : string
  email : string
  password : string
}

type RegisterUserUseCaseResponse = Either<
null, 
{
  user : User
}
>

export class RegisterUserUseCase{

  constructor(
    private usersRepository : UsersRepository
  ) {}

  async execute( { name, email, password } : RegisterUserUseCaseRequest ) : Promise<RegisterUserUseCaseResponse> {

    const emailExists = await this.usersRepository.findByEmail(email);

    if ( emailExists ) 
    {
      return makeLeft(new )
    }


  }

}