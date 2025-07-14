
import { Controller, Post, UsePipes } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import type { PrismaService } from '../../../../prisma/prisma.service'

const registerUserBodySchema = z.object({
  name : z.string(),
  email: z.string().email(),
  password: z.string()
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/users')
export class RegisterUserController {
  constructor(
    private prisma : PrismaService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body : RegisterUserBodySchema) {
    const {name, email, password} = body;

    const emailExists = await this.prisma.
    
  }
}