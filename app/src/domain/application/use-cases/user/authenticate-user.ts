import { Either, makeLeft } from "@/core/types/either";
import type { UsersRepository } from "../../repositories/users-repository";
import type { User } from "@/domain/enterprise/entities/user";
import { InvalidCredentialsError } from "@/core/error/errors/invalid-credentials-error";
import type { HashComparer } from "../../cryptography/hash-comparer";


interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
InvalidCredentialsError,
{
  user : User
}
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer
  ){}

  async execute({email, password} : AuthenticateUserUseCaseRequest) : Promise<AuthenticateUserUseCaseResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      return makeLeft(new InvalidCredentialsError());
    }

    const passwordMatches = await this.hashComparer.compare(password, user.password);

    if(!passwordMatches){
      return makeLeft(new InvalidCredentialsError());
    }

    // criar token
  }
}