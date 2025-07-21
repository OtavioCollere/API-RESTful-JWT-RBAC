import { makeLeft, makeRight, type Either } from "../../../core/either/either";
import { Injectable } from "@nestjs/common";
import { EmailAlreadyExistsError } from "../../../core/errors/email-already-exists-error";
import type { UsersRepository } from "../repositories/users-repository";
import type { HashGenerator } from "../cryptograph/hash-generator";
import { User } from "../../enterprise/entities/user";
import { WrongCredentialsError } from "../../../core/errors/wrong-credentials-error";
import type { HashComparer } from "../cryptograph/hash-comparer";
import type { Encrypter } from "../cryptograph/encrypter";


interface AuthenticateUseCaseRequest {
  email : string
  password : string
}

type AuthenticateUseCaseResponse = Either<
WrongCredentialsError,
{
  accessToken : string,
  refreshToken : string
}
>

@Injectable()
export class AuthenticateUseCase{

  constructor(
    private usersRepository : UsersRepository,
    private hashComparer : HashComparer,
    private encrypter : Encrypter
  ) {}
  
  async handle({email, password}: AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return makeLeft(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(password, user.password);

    if(!isPasswordValid) {
      return makeLeft(new WrongCredentialsError())
    }

    const tokens = await this.encrypter.generateToken({
      sub: user.id.toString(), 
    });

    return makeRight({
      accessToken : tokens.access_token,
      refreshToken : tokens.refresh_token
    })

  }

}