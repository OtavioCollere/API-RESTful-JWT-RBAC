
# Necessário criar ConfigModule para conseguirmos acessar e validar as variaveis de ambiente 
 - acessar as variaveis em qualquer lugar da aplicacao
 - process.env não da para fazer qualquer tipo de validação e parse
 - utilizar zod + process env para validação


Passo a passo
- Criar arquivo env.ts
  - usar z.object() e z.infer() para validar as variaveis de ambiente
- Em AppModule importar o ConfigModule( do nest config )
- Usar o configModule.forRoot => forRoot é usado para quando eu quero passar configuração

```
  ConfigModule.forRoot({
    validate : env => envSchema.parse(env), // Funcao que recebe as variavéis de ambiente e usa uma funcao que retorna true ou false pra saber se aquilo está válido ou não
    isGlobal : true // Se eu quiser usar env em toda aplicação, tenho que deixar global true para nao ter que fazer o configModule em todo lugar da aplicacao ( cada um dos modulos )
  })
```
- Para usar as variaveis de ambiente, temos que usar configService ( vem de nest config )
- Pode ser usado no mesmo padrao do prismaService ( com inversão de dependencia )
- Para usar o configSerivce, tem que ir em main.ts 
  - inserir const configService = app.get<ConfigService<Env, true>>(ConfigService) ( explique esse <COJNFIGSERVICE QUE NAO ENTENDI>)

  - Ao configurarmos o configModule no AppModule
   - expomos um serviço ( configService )
   - e quando usamos o app.get conseguimos pegar qualquer serviço da aplicacao

- para pegar a port, utilizamos
 const port = configService.get('PORT', { infer: true })