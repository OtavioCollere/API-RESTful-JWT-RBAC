import { makeLeft, makeRight, type Either } from "../../../core/either/either";
import { Injectable } from "@nestjs/common";
import type { UsersRepository } from "../repositories/users-repository";
import { WrongCredentialsError } from "../../../core/errors/wrong-credentials-error";
import type { Encrypter } from "../cryptograph/encrypter";

interface TokenPayload {
  sub: string
}

interface RefreshTokenUseCaseRequest {
  refreshToken : string
}

type RefreshTokenUseCaseResponse = Either<
WrongCredentialsError,
{
  accessToken : string,
  refreshToken : string
}
>

@Injectable()
export class RefreshTokenUseCase{

  constructor(
    private usersRepository : UsersRepository,
    private encrypter : Encrypter
  ) {}
  
  async execute({refreshToken}: RefreshTokenUseCaseRequest) : Promise<RefreshTokenUseCaseResponse> {
    const isValid = await this.encrypter.verify(refreshToken);

    if (!isValid) {
      return makeLeft(new WrongCredentialsError())
    }

    const payload = this.encrypter.decode<TokenPayload>(refreshToken);

    const sub = payload?.sub;
    
    if (!sub) {
      return makeLeft(new WrongCredentialsError());
    }

    const user = this.usersRepository.findUserById(sub)

    if(!user) {
      return makeLeft(new WrongCredentialsError())
    }

    const tokens = await this.encrypter.generateToken({sub})
    
    return makeRight({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    })
  }

}