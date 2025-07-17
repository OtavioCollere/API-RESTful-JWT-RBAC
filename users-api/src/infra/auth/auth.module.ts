import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import type { Env } from "../../env/env";
import { JwtStrategy } from "./jwt-strategy";

@Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
      imports : [],
      inject : [],
      global : true,
      async useFactory(config : ConfigService<Env, true>) {

        const publicKey = config.get('PUBLIC_KEY', {infer : true});
        const privateKey = config.get('PRIVATE_KEY', {infer: true});

        return {
          signOptions : { algorithm : 'RS256'},
          publicKey : Buffer.from(publicKey),
          privateKey : Buffer.from(privateKey)
        }

      }
    })
  ],
  providers : [JwtStrategy]
})
export class AuthModule{}