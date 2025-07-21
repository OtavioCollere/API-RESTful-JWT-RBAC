import { Module } from "@nestjs/common";
import { RegisterUserController } from "./controllers/users/register-user.controller";
import { DatabaseModule } from "../database/database.module";
import { CryptographModule } from "../cryptography/cryptography.module";


@Module({
  imports: [
    DatabaseModule, CryptographModule
  ],
  controllers : [
    RegisterUserController,
  ],
  providers : []
})
export class HttpModule{}