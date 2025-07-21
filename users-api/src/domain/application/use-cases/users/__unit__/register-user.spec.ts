import { beforeEach } from 'node:test'
import { describe } from 'vitest'
import { RegisterUserUseCase } from '../register-user'
import { InMemoryUsersRepository } from '../../../../../../tests/repositories/in-memory-users-repository'
import type { FakeHasher } from '../../../../../../tests/cryptography/fake-hasher'

let sut : RegisterUserUseCase
let inMemoryUsersRepository : InMemoryUsersRepository
let fakeHasher : FakeHasher

describe('RegisterUserUseCase Unit tests' , () => {

  beforeEach(() => {
      inMemoryUsersRepository = new InMemoryUsersRepository()
      sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })
  
})