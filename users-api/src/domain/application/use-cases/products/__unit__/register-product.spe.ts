import { beforeEach } from 'node:test'
import { describe, expect, it } from 'vitest'
import { RegisterProductUseCase } from './products/register-product'
import { InMemoryProductsRepository } from '../../../../../../tests/repositories/in-memory-products-repository'
import { isRight, unwrapEither } from '../../../../../core/either/either'

let sut : RegisterProductUseCase
let inMemoryProductsRepository : InMemoryProductsRepository

describe('RegisterProduct Unit tests' , () => {

  beforeEach(() => {
      inMemoryProductsRepository = new InMemoryProductsRepository()
      sut = new RegisterProductUseCase(inMemoryProductsRepository)
  })
  
  it("should be able to register a product", async() => {
    const result = await sut.execute({
      name : "Produto X",
      price : 1200,
      quantity : 200
    })

    expect(isRight(result))
    if(isRight(result)){
      expect(inMemoryProductsRepository.items.length).toEqual(1)
      expect(inMemoryProductsRepository.items[0].id.toString()).toEqual(unwrapEither(result).product.id.toString())
    }

  })

})