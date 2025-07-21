import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import z from "zod";
import type { RefreshTokenUseCase } from "../../../../domain/application/use-cases/users/refresh-token";
import { isLeft, unwrapEither } from "../../../../core/either/either";
import { WrongCredentialsError } from "../../../../core/errors/wrong-credentials-error";


const refreshTokenBodySchema = z.object({
  refreshToken : z.string()
})

type RefreshTokenBodySchema = z.infer<typeof refreshTokenBodySchema>

@Controller('/refresh')
export class RefreshTokenController{

  constructor(
    private refreshTokenUseCase : RefreshTokenUseCase
  ) {}
  
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(refreshTokenBodySchema))
  async handle(@Body() body: RefreshTokenBodySchema) {
      const {refreshToken} = body;

      const result = await this.refreshTokenUseCase.execute({refreshToken})

      if(isLeft(result))
      {
        const error = unwrapEither(result)

        switch (error.constructor)
        {
          case WrongCredentialsError:
            throw new UnauthorizedException()
          default : 
            throw new BadRequestException()
        }
    }

    const access_token = unwrapEither(result).accessToken
    const refresh_token = unwrapEither(result).refreshToken

    return {
      access_token,
      refresh_token
    }

  }

}