import { Injectable } from "@nestjs/common";
import { makeLeft, makeRight, type Either } from "../../../../core/either/either";
import { Product } from "../../../enterprise/entities/product";
import { ProductsRepository } from "../../repositories/products-repository";
import type { UsersRepository } from "../../repositories/users-repository";
import { UserNotFoundError } from "@/core/errors/user-not-found-error";
import { ProductAlreadyExistsError } from "@/core/errors/product-already-exists-error";
import { ProductNotFoundError } from "@/core/errors/product-not-found-error";

interface EditProductUseCaseRequest {
  userId : string
  productId : string
  name : string
  price : number;
  quantity: number
}

type EditProductUseCaseResponse = Either<
UserNotFoundError | ProductAlreadyExistsError,
{
  product : Product
}
>

@Injectable()
export class EditProductUseCase{

  constructor(
    private productsRepository : ProductsRepository,
    private usersRepository : UsersRepository
  ) {}

  async execute({userId, productId, name, price, quantity} : EditProductUseCaseRequest) : Promise<EditProductUseCaseResponse> {

    const product = await this.productsRepository.findById(productId)

    if(!product) {
      return makeLeft(new ProductNotFoundError())
    }

    const slug = Product.slugify(name)

    const productAlreadyExists = await this.productsRepository.findBySlug(slug)

    if(productAlreadyExists) {
      return makeLeft(new ProductAlreadyExistsError())
    }

    const userExists = await this.usersRepository.findUserById(userId)

    if (!userExists) {
      return makeLeft(new UserNotFoundError())
    }

    if (name) product.name = name
    if (price) product.price = price
    if (quantity) product.quantity = quantity

    await this.productsRepository.save(product)

    return makeRight({
      product
    })
  }

}