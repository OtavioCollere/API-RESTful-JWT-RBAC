import { Module } from "@nestjs/common";
import { RegisterUserController } from "./controllers/users/register-user.controller";
import { DatabaseModule } from "../database/database.module";


@Module({
  imports: [
    DatabaseModule
  ],
  controllers : [
    RegisterUserController,
  ],
  providers : []
})
export class HttpModule{}