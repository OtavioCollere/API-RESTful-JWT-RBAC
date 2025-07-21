import { Post, HttpCode, Body, Controller, UsePipes, ConflictException, UnauthorizedException } from '@nestjs/common';
import z from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import type { PrismaService } from "../../../database/prisma/prisma.service";
import { compare, hash } from "bcryptjs";
import type { JwtService } from '@nestjs/jwt';


const registerUserBodySchema = z.object({
  email : z.string().email(),
  password : z.string()
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('sessions')
export class AuthenticateController{

  constructor(
    private prismaService : PrismaService,
    private jwt : JwtService
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body : RegisterUserBodySchema) {
  
  }
}