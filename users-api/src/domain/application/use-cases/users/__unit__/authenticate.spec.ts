import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { InMemoryUsersRepository } from '../../../../../../tests/repositories/in-memory-users-repository'
import { FakeHasher } from '../../../../../../tests/cryptography/fake-hasher'
import { FakeEncrypter } from '../../../../../../tests/cryptography/fake-encrypter'
import { makeUser } from '../../../../../../tests/factories/make-user'
import { isLeft, isRight, unwrapEither } from '../../../../../core/either/either'
import { WrongCredentialsError } from '../../../../../core/errors/wrong-credentials-error'

let sut: AuthenticateUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher

describe('Authenticate Unit tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(inMemoryUsersRepository, fakeHasher, fakeEncrypter)
  })

  it('should be able to authenticate user', async () => {
    const user = await makeUser({
      email: 'otavio@email.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'otavio@email.com',
      password: '123456',
    })

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      const tokens = unwrapEither(result)
      expect(tokens).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    }
  })

  it('should not authenticate with wrong password', async () => {
    const user = await makeUser({
      email: 'otavio@email.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'otavio@email.com',
      password: 'wrong-password',
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(WrongCredentialsError)
    }
  })

  it('should not authenticate non-existent user', async () => {
    const result = await sut.execute({
      email: 'notfound@email.com',
      password: 'any-password',
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(WrongCredentialsError)
    }
  })
})
