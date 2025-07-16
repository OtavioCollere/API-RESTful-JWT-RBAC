- em auth, criar arquivo jwt-strategy
- Importar PassportStrategy
- iImportar Stragey do passport-jwt

```
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config : ConfigService<Env,true>) {}

  const publicKey = config.get('PUBLIC_KEY', {infer : true})

  super({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : Buffer.from(publicKey, 'base64'),
    algorithms : ['RS256']
  })
}
```