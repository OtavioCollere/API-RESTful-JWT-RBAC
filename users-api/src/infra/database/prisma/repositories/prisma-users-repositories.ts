import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/domain/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepositories implements UsersRepository{

  constructor(
    private prismaService : PrismaService
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where : {email}
    })

    if(!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prismaService.user.create({data})

    return user
  }

  async delete(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.delete({
      where : {
        id : data.id
      }
    })
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where : {
        id
      }
    })

    if(!user) return null

    return PrismaUserMapper.toDomain(user)
  }
  
}