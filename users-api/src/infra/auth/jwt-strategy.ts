import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import z from "zod";
import type { Env } from "../../env/env";
import type { ConfigService } from "@nestjs/config";

const tokenPayloadSchema = z.object({
  sub : z.string().uuid()
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>


// Essa classe é o "Segurança da aplicação", ele que vai validar se o token JWT é valido
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(config : ConfigService<Env, true>){

    const publicKey = config.get('PUBLIC_KEY', {infer: true});

    super({
      // De onde vou pegar meu token?
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Chave que vou validar
      secretOrKey : Buffer.from(publicKey, 'base64'),

      // Estrategia
      algorithms: ['RS256']
    })
  }
  
  validate(payload : UserPayload)  {
    return tokenPayloadSchema.parse(payload)
  }
  
}