import type { UsersRepository } from "../../src/domain/application/repositories/users-repository";
import type { User } from "../../src/domain/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository{
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)
    
    if (!user) return null

    return user;
  }

  async create(user: User): Promise<User> {
     this.items.push(user)

    return user;
  }

  async delete(user: User): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() === user.id.toString())
  }
  
  async findUserById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)
    
    if(!user) {
      return null;
    }

    return user
  }

}