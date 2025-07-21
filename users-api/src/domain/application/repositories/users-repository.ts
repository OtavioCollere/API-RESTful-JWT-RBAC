import { Injectable } from "@nestjs/common";
import type { User } from "../../enterprise/entities/user";

export abstract class UsersRepository{
  abstract findByEmail(email : string) : Promise<User | null>
  abstract create(user : User) : Promise<User>
  abstract delete(user : User) : Promise<void>
  abstract findUserById(id : string) : Promise<User | null>
}