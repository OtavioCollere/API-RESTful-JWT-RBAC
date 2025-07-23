import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepositories } from "./prisma/repositories/prisma-users-repositories";
import { UsersRepository } from "@/domain/application/repositories/users-repository";


@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide : UsersRepository,
      useClass : PrismaUsersRepositories
    }
  ],
  exports : [
    PrismaService,
    UsersRepository
  ]
})
export class DatabaseModule{}