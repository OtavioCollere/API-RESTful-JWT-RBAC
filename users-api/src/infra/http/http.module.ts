import { Module } from "@nestjs/common";
import { RegisterUserController } from "./controllers/users/register-user.controller";
import { DatabaseModule } from "../database/database.module";
import { CryptographModule } from "../cryptography/cryptography.module";
import { RefreshTokenController } from "./controllers/users/refresh-token.controller";
import { AuthenticateController } from "./controllers/users/authenticate.controller";
import { RefreshTokenUseCase } from "../../domain/application/use-cases/users/refresh-token";
import { AuthenticateUseCase } from "../../domain/application/use-cases/users/authenticate";
import { RegisterUserUseCase } from "../../domain/application/use-cases/users/register-user";
import { RegisterProductUseCase } from "@/domain/application/use-cases/products/register-product";
import { EditProductUseCase } from "@/domain/application/use-cases/products/edit-product";
import { DeleteProductUseCase } from "@/domain/application/use-cases/products/delete-product";


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
    RegisterUserUseCase,

    RegisterProductUseCase,
    EditProductUseCase,
    DeleteProductUseCase
  ]
})
export class HttpModule{}