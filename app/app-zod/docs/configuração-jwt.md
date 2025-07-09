# Auth JWT
- Em src/ criar folder Auth
- Criar AuthModule
  - importar authModule dentro de appModule
  - instalar nestjs/passport nestjs/jwt
- Importar PassportModule  dentro de imports
- Importar JwtModule
- Configurar o JWTMODULE
  - JwtModule.registerAsync({
    inject : [ConfigService],
    async useFactory(config : COnfigService<Env, true>) {
      const secret = config.get('JWT_SECRET', {infer : true })
      
      return {
        secret
      }
    }
  })


  - Secrete tem public e private key 
    - chave privada vai ficar armazenada somente no serviço que cria as auths
    - chave public pode estar em todos os serviços que precisam validar que user está logado 
      - Chave púbica nao consegue criar novos tokens
      - FOi gerada a partir da privada, entao pode ser usada para chegar se o JWT do user é válido e foi gerado a partir de tal chave privada


- Chave publica e privada precisam seguir um padrão
  - Gerar chaves ( generate rsa256 private key ) => gerar no GPT
  - A Partir da chave privada, gerar uma chave pulbic
  - Após gerar, converter para base 64 as duas chaves
  - Jogar o conteúdo no ENV
  - em AuthModule retornar privateKey e publicKey

```
   JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
```