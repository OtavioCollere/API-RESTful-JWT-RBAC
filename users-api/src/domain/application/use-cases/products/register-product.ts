import { Injectable } from "@nestjs/common";
import { makeRight, type Either } from "../../../../core/either/either";
import { Product } from "../../../enterprise/entities/product";
import { ProductsRepository } from "../../repositories/products-repository";

interface RegisterProductUseCaseRequest {
  name : string
  price : number;
  quantity: number
}

type RegisterProductUseCaseResponse = Either<
null,
{
  product : Product
}
>

@Injectable()
export class RegisterProductUseCase{

  // implementar buscar por nome
  // implementar buscar por id

  constructor(
    private productsRepository : ProductsRepository
  ) {}

  async execute({name, price, quantity} : RegisterProductUseCaseRequest) : Promise<RegisterProductUseCaseResponse> {

    const product = Product.create({
      name, price, quantity
    })

    await this.productsRepository.create(product)

    return makeRight({
      product
    })
  }

}