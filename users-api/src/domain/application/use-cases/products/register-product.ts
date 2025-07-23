import { Injectable } from "@nestjs/common";
import { makeLeft, makeRight, type Either } from "../../../../core/either/either";
import { Product } from "../../../enterprise/entities/product";
import { ProductsRepository } from "../../repositories/products-repository";
import type { UsersRepository } from "../../repositories/users-repository";
import { UserNotFoundError } from "@/core/errors/user-not-found-error";
import { ProductAlreadyExistsError } from "@/core/errors/product-already-exists-error";

interface RegisterProductUseCaseRequest {
  userId : string
  name : string
  price : number;
  quantity: number
}

type RegisterProductUseCaseResponse = Either<
UserNotFoundError | ProductAlreadyExistsError,
{
  product : Product
}
>

@Injectable()
export class RegisterProductUseCase{

  constructor(
    private productsRepository : ProductsRepository,
    private usersRepository : UsersRepository
  ) {}

  async execute({userId ,name, price, quantity} : RegisterProductUseCaseRequest) : Promise<RegisterProductUseCaseResponse> {

    const productExists = await this.productsRepository.findBySlug() 

    if (!productExists) {
      return makeLeft(new ProductAlreadyExistsError)
    }

    const userExists = await this.usersRepository.findUserById(userId)

    if(!userExists) {
      return makeLeft(new UserNotFoundError())
    }

    const product = Product.create({
      name, price, quantity
    })

    await this.productsRepository.create(product)

    return makeRight({
      product
    })
  }

}