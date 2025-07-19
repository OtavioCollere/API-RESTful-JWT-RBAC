import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import type { Env } from "../../env/env";


@Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
      global : true,
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService<Env, true>) {

        const publickey = config.get('PUBLIC_KEY', {infer : true})
        const privateKey = config.get('PRIVATE_KEY', {infer : true})
        
        return{
          signOptions : {algorithm : 'RS256'},
          privateKey : Buffer.from(privateKey, 'base64'),
          publicKey : Buffer.from(publickey, 'base64')
        }
      }
    })
  ],
})
export class AuthModule{}