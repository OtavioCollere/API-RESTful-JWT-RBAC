import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import z from "zod";
import { ZodValidationPipe } from "../../http/pipes/zod-validation-pipe";
import type { PrismaService } from "../../database/prisma/prisma.service";
import { hash } from "bcryptjs";


const registerUserBodySchema = z.object({
  name : z.string(),
  email : z.string().email(),
  password : z.string()
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>


@Controller('users')
export class RegisterUserController{

  constructor(
    private prismaService : PrismaService
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body : RegisterUserBodySchema) {
    const {name, email, password} = body;

    const emailExists = await this.prismaService.users.findUnique{
      where : {
        email
      }
    }

    if(emailExists) {
      throw new ConflictException("Email already exists.")
    }

    const hashedPassword = await hash(password, 6)

    await this.prismaService.create({
      name,
      email,
      password : hashedPassword
    })

  }
}