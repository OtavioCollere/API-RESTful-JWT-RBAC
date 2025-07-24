import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterProductUseCase } from '../register-product'
import { InMemoryProductsRepository } from '../../../../../../tests/repositories/in-memory-products-repository'
import { isLeft, isRight, unwrapEither } from '../../../../../core/either/either'
import { InMemoryUsersRepository } from 'tests/repositories/in-memory-users-repository'
import { makeUser } from 'tests/factories/make-user'
import { makeProduct } from 'tests/factories/make-product'
import { ProductAlreadyExistsError } from '@/core/errors/product-already-exists-error'
import { UserNotFoundError } from '@/core/errors/user-not-found-error'

let sut : RegisterProductUseCase
let inMemoryProductsRepository : InMemoryProductsRepository
let inMemoryUsersRepository : InMemoryUsersRepository

describe('RegisterProduct Unit tests' , () => {

  beforeEach(() => {
      inMemoryProductsRepository = new InMemoryProductsRepository()
      inMemoryUsersRepository = new InMemoryUsersRepository()
      sut = new RegisterProductUseCase(inMemoryProductsRepository,inMemoryUsersRepository)
  })
  
  it("should be able to register a product", async() => {

    const user = await makeUser({
      name : 'Otavio'
    })
    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      userId : user.id.toString(),
      name : "Produto X",
      price : 1200,
      quantity : 200,
    })

    expect(isRight(result)).toBe(true)
    if(isRight(result)){
      expect(inMemoryProductsRepository.items.length).toEqual(1)
      expect(inMemoryProductsRepository.items[0].createdBy).toEqual(user.id)
      expect(unwrapEither(result).product.name).toEqual('Produto X')
    }

  })

  it("should not be able to register an existent product ", async() => {

    const user = await makeUser({
      name : 'Otavio'
    })
    inMemoryUsersRepository.items.push(user)
    
    const product = await makeProduct({
      name : 'Produto X'
    });
    inMemoryProductsRepository.items.push(product)

    const result = await sut.execute({
      userId : user.id.toString(),
      name : "Produto X",
      price : 1200,
      quantity : 200,
    })

    expect(isLeft(result)).toBe(true)
    expect(unwrapEither(result)).toBeInstanceOf(ProductAlreadyExistsError)
  })

  it("should not be able to register with non existent users ", async() => {

    const result = await sut.execute({
      userId : 'any id',
      name : "Produto X",
      price : 1200,
      quantity : 200,
    })

    expect(isLeft(result)).toBe(true)
    expect(unwrapEither(result)).toBeInstanceOf(UserNotFoundError)
  })

})