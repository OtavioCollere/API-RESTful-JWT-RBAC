
// Na hora de criar o sistema de autenticação, começamos pelo jwt-strategy
- pois o JwtStrategy que vai definir como o token vai ser extraido da requisição
  - nesse caso vai ser extraido ho header Bearer <token>
- Definimos o algoritmo e chave publica para verificar o token
- Dessa forma, estamos dizendo ao nest como ele deve validar os tokens recebidos no header das requisicoes. Sem esse arquivo não conseguimos proteger rotas e nem confiar nos tokens


// Após o Strategy Configurado, vamos para o JwtAuthGuard
- Agora precisamos aplicar a estrategia nas rotas para protege-las
- O JwtAuthGuard estende o AuthGuard com a estratégia JWT
- Ativa a verificação JWT em qualquer rota que usar o useGuards
- Esse guard intercepta requisições e só deixa passar se o token for válido. É o que realmente aplica a autenticação nas rotas.

// AuthModule -> Arquivo que junta tudo
- PassportModule: necessário para usar estratégias Passport.
- JwtModule: configura assinar/verificar JWTs com chaves RSA.
- Usa JwtModule.registerAsync:
  Pega as chaves PUBLIC_KEY e PRIVATE_KEY.

  Retorna configuração para:
  signOptions: RS256.
  publicKey e privateKey: buffers, para uso em assinatura/verificação.

Registra JwtStrategy como provider.
- Esse módulo orquestra tudo: fornece acesso ao JWT, injeta as chaves, registra a estratégia. É o ponto de entrada da autenticação.

## 🧠 Contexto geral da analogia

Imagine que você está criando a segurança de um **prédio corporativo**. Só entra quem tiver **crachá válido**.  
Esse crachá é o **JWT (token)**, e ele é assinado pelo **RH** (com a **chave privada**) e conferido pela **portaria** (com a **chave pública**).

---

### 1. `JwtStrategy` = **O segurança da portaria que confere o crachá**  
**Arquivo:** `jwt-strategy.ts`

Esse é o cara que **olha para o crachá (JWT)** e verifica se ele é verdadeiro e se pertence a alguém com autorização.

**Função na analogia:**
- Pega o crachá da pessoa na entrada.
- Usa a **chave pública** para conferir se o crachá foi realmente emitido pelo RH.
- Valida se os dados estão corretos (tipo, se tem um CPF, nome, etc).
- Se estiver tudo certo, ele deixa passar e registra quem entrou.

> **Zod** aqui é como um **scanner** que confere se o crachá tem o formato certo.

---

### 2. `JwtAuthGuard` = **A catraca automática que só gira se o segurança liberar**  
**Arquivo:** `jwt-auth.guard.ts`

É o **dispositivo de bloqueio físico**. Só deixa a pessoa passar **se o segurança (`JwtStrategy`)** disser que está tudo certo com o crachá.

**Função na analogia:**
- Bloqueia qualquer um sem crachá.
- Só abre se o crachá for legítimo e o segurança der ok.

---

### 3. `AuthModule` = **O departamento de segurança que monta a equipe, instala a catraca e configura as regras**  
**Arquivo:** `auth.module.ts`

Junta o segurança, a catraca, e entrega as **chaves de acesso**. É a **central de comando**.

**Função na analogia:**
- Diz qual o algoritmo de segurança será usado (`RS256` = assinatura digital com chaves).
- Informa qual a **chave pública** e **privada** estão em uso (quem assina e quem valida).
- Treina o segurança (`JwtStrategy`) e instala a catraca (`JwtAuthGuard`).

---

## 📋 Conclusão da analogia

| Elemento técnico   | Analogia simples                                     |
|--------------------|------------------------------------------------------|
| **JWT (token)**    | Crachá digital assinado pelo RH                      |
| **Chave privada**  | Caneta especial do RH que assina o crachá            |
| **Chave pública**  | Lupa do segurança para conferir a assinatura         |
| **JwtStrategy**    | Segurança da portaria                                |
| **JwtAuthGuard**   | Catraca que só gira com autorização                  |
| **AuthModule**     | Departamento que monta e configura tudo              |
