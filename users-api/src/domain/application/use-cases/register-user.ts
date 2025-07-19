import type { User } from "@prisma/client";
import type { Either } from "../../../core/either/either";
import { Injectable } from "@nestjs/common";


interface RegisterUserUseCaseRequest {

}

type RegisterUserUseCaseResponse = Either<
null,
{
  user : User
}
>

@Injectable()
export class RegisterUserUseCase{

  async handle() {}

}