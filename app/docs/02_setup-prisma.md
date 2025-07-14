Instalar dependecias do prisma
- pnpm i prisma -D
- pnpm @prisma/client
- npx prisma init

- Criar model em schema.prisma

- Criar service do prisma para que os controllers consigam acessar
- Criar pasta prisma em src
- Criar o prisma service ts
- dentro de service.ts
``` 
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
  super({
    log : ['warn', 'error']
  })

  async OnModuleInit(){
    return this.$connect()
  }

  async OnModuleDestroy() {
    return this.$disconnect()
  }
}
```

🧩 Resumo das funções do Prisma
@prisma/client
Biblioteca que fornece o cliente gerado automaticamente a partir do seu schema.prisma.
Permite fazer queries fortemente tipadas direto no banco.

prisma CLI
Usado para inicializar o projeto (prisma init), gerar o cliente e aplicar migrações.

PrismaService
Service customizado que estende PrismaClient para ser usado com injeção de dependência no NestJS.
Cuida da conexão com o banco

⚙️ Relação entre PrismaService, super, e PrismaClient
PrismaService estende PrismaClient, que é a classe gerada pelo @prisma/client para permitir acesso ao banco.
Ao fazer isso, você herda todos os métodos (user.findMany(), post.create(), etc.) diretamente na sua service.

export class PrismaService extends PrismaClient { ... }
O super({...}) dentro do construtor chama o construtor da classe PrismaClient, passando opções de configuração — como quais tipos de logs mostrar ('warn', 'error').

Por que isso é importante?
Permite centralizar a configuração do Prisma (ex: logging, middlewares).

Torna o Prisma injetável com @Injectable() no NestJS.

Controla o ciclo de vida com os métodos onModuleInit() e onModuleDestroy() — conectando e desconectando automaticamente ao iniciar ou encerrar a aplicação.