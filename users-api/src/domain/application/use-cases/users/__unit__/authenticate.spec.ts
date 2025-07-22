import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from '../register-user'
import { InMemoryUsersRepository } from '../../../../../../tests/repositories/in-memory-users-repository'
import { FakeHasher } from '../../../../../../tests/cryptography/fake-hasher'
import { isLeft, isRight, unwrapEither } from '../../../../../core/either/either'
import { AuthenticateUseCase } from '../authenticate'
import { FakeEncrypter } from '../../../../../../tests/cryptography/fake-encrypter'
import { makeUser } from '../../../../../../tests/factories/make-user'
import { log } from 'console'

let sut : AuthenticateUseCase
let inMemoryUsersRepository : InMemoryUsersRepository
let fakeEncrypter : FakeEncrypter
let fakeHasher : FakeHasher

describe('Authenticate Unit tests' , () => {

  beforeEach(() => {
      inMemoryUsersRepository = new InMemoryUsersRepository()
      fakeHasher = new FakeHasher()
      fakeEncrypter = new FakeEncrypter()
      sut = new AuthenticateUseCase(inMemoryUsersRepository, fakeHasher, fakeEncrypter)
  })

  it("should be abe to authenticate user", async () => {

    const user = await makeUser({
      name : 'otavio',
      email : "Otavio@email.com",
      password : await fakeHasher.hash("123456")
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email : "Otavio@email.com",
      password : "123456"
    })

    expect(isRight(result)).toBe(true)
    if(isRight(result)){
      const tokens = unwrapEither(result)
      
      expect(tokens).toEqual({
        accessToken : expect.any(String),
        refreshToken : expect.any(String)
      })

    }

  })

})