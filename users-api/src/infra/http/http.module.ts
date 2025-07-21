import { Module } from "@nestjs/common";
import { RegisterUserController } from "./controllers/users/register-user.controller";
import { DatabaseModule } from "../database/database.module";
import { CryptographModule } from "../cryptography/cryptography.module";
import { RefreshTokenController } from "./controllers/users/refresh-token.controller";
import { AuthenticateController } from "./controllers/users/authenticate.controller";
import { RefreshTokenUseCase } from "../../domain/application/use-cases/refresh-token";
import { AuthenticateUseCase } from "../../domain/application/use-cases/authenticate";
import { RegisterUserUseCase } from "../../domain/application/use-cases/register-user";


@Module({
  imports: [
    DatabaseModule, CryptographModule
  ],
  controllers : [
    RefreshTokenController,
    AuthenticateController,
    RegisterUserController,
  ],
  providers : [
    RefreshTokenUseCase,
    AuthenticateUseCase,
    RegisterUserUseCase
  ]
})
export class HttpModule{}