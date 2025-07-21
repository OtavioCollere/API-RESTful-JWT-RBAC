import { compare, hash } from "bcryptjs";
import type { HashComparer } from "../../domain/application/cryptograph/hash-comparer";
import type { HashGenerator } from "../../domain/application/cryptograph/hash-generator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer{
  private PASSWORD_SALTH_LENGTH = 6;

  hash(password: string, salt: number): Promise<string> {
    return hash(password, this.PASSWORD_SALTH_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
 
}