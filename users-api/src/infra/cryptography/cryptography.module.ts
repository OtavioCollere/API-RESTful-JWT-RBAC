import { Module } from "@nestjs/common";
import { Encrypter } from "../../domain/application/cryptograph/encrypter";
import { JwtEncrypter } from "./jwt-encrypter";
import { HashGenerator } from "../../domain/application/cryptograph/hash-generator";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashComparer } from "../../domain/application/cryptograph/hash-comparer";


@Module({
  providers : [
    {provide : Encrypter , useClass : JwtEncrypter},
    {provide : HashGenerator , useClass : BcryptHasher},
    {provide : HashComparer , useClass : BcryptHasher}
  ],
  exports : [
    Encrypter, HashComparer, HashGenerator
  ]
})
export class CryptographModule{}