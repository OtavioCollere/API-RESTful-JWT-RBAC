import { Post, HttpCode, Body, Controller, UsePipes, ConflictException, BadRequestException } from '@nestjs/common';
import z from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { RegisterUserUseCase } from '../../../../domain/application/use-cases/users/register-user';
import { isLeft, unwrapEither } from '../../../../core/either/either';
import { EmailAlreadyExistsError } from '../../../../core/errors/email-already-exists-error';


const registerUserBodySchema = z.object({
  name : z.string(),
  email : z.string().email(),
  password : z.string()
})

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/users')
export class RegisterUserController{

  constructor(
    private registerUser : RegisterUserUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body : RegisterUserBodySchema) {
    const {name, email, password} = body;

    const result = await this.registerUser.execute({
      name, email, password
    })

    if(isLeft(result))
    {
      const error = unwrapEither(result)

      switch (error.constructor)
      {
        case EmailAlreadyExistsError:
          throw new ConflictException()
        default : 
          throw new BadRequestException()
      }
    }

    const user = unwrapEither(result).user

    return{
      user
    }

  }
}