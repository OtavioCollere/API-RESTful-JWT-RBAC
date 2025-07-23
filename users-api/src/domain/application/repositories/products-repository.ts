import { Product } from "../../enterprise/entities/product";

export abstract class ProductsRepository{
  abstract findById(id : string) : Promise<Product | null>
  abstract create(product : Product) : Promise<Product>
  abstract delete(product : Product) : Promise<void>  
  abstract getAll(query : string, page : number) : Promise<Product[]>
}