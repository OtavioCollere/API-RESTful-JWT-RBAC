import { Post, HttpCode, Body, Controller, UsePipes, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import z from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import type { PrismaService } from "../../../database/prisma/prisma.service";
import { compare, hash } from "bcryptjs";
import type { JwtService } from '@nestjs/jwt';
import type { RefreshTokenUseCase } from '../../../../domain/application/use-cases/refresh-token';
import { isLeft, unwrapEither } from '../../../../core/either/either';
import { WrongCredentialsError } from '../../../../core/errors/wrong-credentials-error';


const refreshTokenBodySchema = z.object({
  refreshToken : z.string()
})

type RefreshTokenBodySchema = z.infer<typeof refreshTokenBodySchema>

@Controller('/refresh')
export class RefreshTokenController{

  constructor(
    private refreshToken : RefreshTokenUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(refreshTokenBodySchema))
  async handle(@Body() body : RefreshTokenBodySchema) {

    const {refreshToken} = body;

    const result = await this.refreshToken.execute({refreshToken});

    if(isLeft(result))
    {
      const error = unwrapEither(result);

      switch (error.constructor) 
      {
        case WrongCredentialsError: 
          throw new WrongCredentialsError()
        default :
          throw new BadRequestException()
      }
    }

    return{
      access_token : unwrapEither(result).accessToken,
      refresh_token : unwrapEither(result).refreshToken
    }

  }
}