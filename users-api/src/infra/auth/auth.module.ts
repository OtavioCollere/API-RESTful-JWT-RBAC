import { Module } from "@nestjs/common";


@Module({
  imports : [
    PassportModule
  ],
})
export class AuthModule{}