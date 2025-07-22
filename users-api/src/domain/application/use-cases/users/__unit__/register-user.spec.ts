import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from '../register-user'
import { InMemoryUsersRepository } from '../../../../../../tests/repositories/in-memory-users-repository'
import { FakeHasher } from '../../../../../../tests/cryptography/fake-hasher'
import { isLeft, isRight, unwrapEither } from '../../../../../core/either/either'
import { makeUser } from '../../../../../../tests/factories/make-user'
import { EmailAlreadyExistsError } from '../../../../../core/errors/email-already-exists-error'

let sut : RegisterUserUseCase
let inMemoryUsersRepository : InMemoryUsersRepository
let fakeHasher : FakeHasher

describe('RegisterUserUseCase Unit tests' , () => {

  beforeEach(() => {
      inMemoryUsersRepository = new InMemoryUsersRepository()
      fakeHasher = new FakeHasher()
      sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it("should be abe to register user", async () => {
    const result = await sut.execute({
      name : 'Otavio',
      email : 'otavio@email.com',
      password : '123456'
    })

    expect(isRight(result)).toBe(true)
    if(isRight(result))
    {
      expect(inMemoryUsersRepository.items[0].password).toStrictEqual('123456-hashed')
      expect(unwrapEither(result).user.id.toString()).toStrictEqual(inMemoryUsersRepository.items[0].id.toString())
    }

  })

  it("should not be able to register user with existent e-mail", async () => {

  const user = await makeUser({
    email : 'otavio@email.com'
  });

  inMemoryUsersRepository.items.push(user)

  const result = await sut.execute({
    name : 'otavio',
     email : 'otavio@email.com',
     password : "123456"
  })

  expect(isLeft(result)).toBe(true)
  expect(unwrapEither(result)).toBeInstanceOf(EmailAlreadyExistsError)

  })
  
})