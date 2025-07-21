import { Post, HttpCode, Body, Controller, UsePipes, UnauthorizedException, BadRequestException } from '@nestjs/common';
import z from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import type { AuthenticateUseCase } from '../../../../domain/application/use-cases/users/authenticate';
import { isLeft, unwrapEither } from '../../../../core/either/either';
import { WrongCredentialsError } from '../../../../core/errors/wrong-credentials-error';


const registerUserBodySchema = z.object({
  email : z.string().email(),
  password : z.string()
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/sessions')
export class AuthenticateController{

  constructor(
    private authenticate : AuthenticateUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body : RegisterUserBodySchema) {
    const {email, password} = body;

    const result = await this.authenticate.execute({
      email, password
    })

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

    const access_token = unwrapEither(result).accessToken;
    const refresh_token = unwrapEither(result).refreshToken;

    return {
      access_token,
      refresh_token
    }
  }
}