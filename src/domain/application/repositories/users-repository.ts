import type { User } from "@/domain/enterprise/entities/user";

export abstract class UsersRepository
{
  abstract findByEmail(email : string) : Promise<User | null> 
  abstract findById(id : string) : Promise<User | null> 
  abstract save(user : User) : Promise<User>
  abstract create(user : User) : Promise<User> 
  abstract delete(user : User) : Promise<void> 
}