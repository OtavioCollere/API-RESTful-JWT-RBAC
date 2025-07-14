import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import type { Env } from "../env";

Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
      inject : [ConfigService],
      global : true,
      async useFactory(config : ConfigService<Env, true>) {
        const publicKey = Buffer.from(config.get('PUBLIC_KEY', {infer : true}));
        const privateKey = Buffer.from(config.get('PRIVATE_KEY', {infer : true}));

        return{
          publicKey,
          privateKey
        }
      }
    })
  ]  
})
export class AuthModule{}