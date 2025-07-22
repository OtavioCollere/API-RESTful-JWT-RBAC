import { faker } from "@faker-js/faker";
import { User, type UserProps } from "../../src/domain/enterprise/entities/user";
import type { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export async function makeUser(override : Partial<UserProps> = {}, id? : UniqueEntityID) {
    const user = User.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password : faker.internet.password(),
        ...override
    }, id)  

    return user
  }