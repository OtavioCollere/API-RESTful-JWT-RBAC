import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport'
import type { Env } from "../../env/env";

@Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
      inject : [ConfigService],
      async useFactory(config: ConfigService<Env, true>){

        const publicKey = config.get('PUBLIC_KEY', {infer: true})
        const privateKey = config.get('PRIVATE_KEY', {infer: true})

        return {
          signOptions : {algorithm : 'RS256'},
          publicKey : Buffer.from(publicKey, 'base64'),
          privateKey : Buffer.from(privateKey, 'base64')
        }
      }
    })
  ],
})
export class AuthModule{}