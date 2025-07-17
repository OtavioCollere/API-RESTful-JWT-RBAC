- em auth, criar arquivo jwt-strategy
- Importar PassportStrategy
- iImportar Stragey do passport-jwt


```
const tokenSchema = z.object({
  sub: z.string().uuid(),
})

type TokenSchema = z.infer<typeof tokenSchema>

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config : ConfigService<Env,true>) {}

  const publicKey = config.get('PUBLIC_KEY', {infer : true})

  super({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : Buffer.from(publicKey, 'base64'),
    algorithms : ['RS256']
  })

  async validate(payload : TokenSchema) {
    return tokenSchema.parse(payload)
  }
}
```

Em authModule, colocar o JwtStrategy em providers

<!-- Protegendo Rotas -->

