import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Product, type ProductProps } from "@/domain/enterprise/entities/product";
import { faker } from "@faker-js/faker";


export function makeProduct(override : Partial<ProductProps> = {}, id? : string){
  const product = Product.create({
    name : faker.commerce.product(),
    price: Number(faker.commerce.price()),
    quantity : 30,
    createdBy : new UniqueEntityID(),
    ...override,
  }, new UniqueEntityID(id))

  return product
}