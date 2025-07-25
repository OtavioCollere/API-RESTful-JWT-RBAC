import { Injectable } from "@nestjs/common";
import { makeLeft, makeRight, type Either } from "../../../../core/either/either";
import { ProductsRepository } from "../../repositories/products-repository";
import { Product } from "../../../enterprise/entities/product";
import { ProductNotFoundError } from "@/core/errors/product-not-found-error";

interface GetProductUseCaseRequest {
  productId: string;
}

type GetProductUseCaseResponse = Either<
  ProductNotFoundError,
  {
    product: Product;
  }
>;

@Injectable()
export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      return makeLeft(new ProductNotFoundError());
    }

    return makeRight({ product });
  }
}
