import { Module } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Env } from "../../env/env";
import { ExtractJwt, Strategy } from 'passport-jwt'
import z from "zod";

const tokenSchema = z.object({
  sub: z.string().uuid()
}) 

type TokenSchema = z.infer<typeof tokenSchema>

@Module({})
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(config : ConfigService<Env, true>) {
    const publicKey = config.get('PUBLIC_KEY', {infer : true})

    super({
      algorithms:  ['RS256'],
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : Buffer.from(publicKey, 'base64')
    })
  }

  validate(payload : TokenSchema){
    return tokenSchema.parse(payload);
  }
  
}