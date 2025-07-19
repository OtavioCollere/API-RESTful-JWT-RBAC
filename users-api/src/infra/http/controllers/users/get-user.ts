import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "../../../auth/current-user-decorator";
import type { UserPayload } from "../../../auth/jwt-strategy";

@Controller('users')
export class RegisterUserController{

  @Get()
  async handle(@CurrentUser() user : UserPayload) {}
}