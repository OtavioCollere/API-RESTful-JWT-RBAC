import type { HashComparer } from "../../src/domain/application/cryptograph/hash-comparer";
import type { HashGenerator } from "../../src/domain/application/cryptograph/hash-generator";

export class FakeHasher implements HashGenerator, HashComparer{
  async hash(password: string): Promise<string> {
    return password.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}