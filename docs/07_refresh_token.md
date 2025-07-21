//
Para gerar o refresh token

- na funcao de implementacao, nesse caso JwtEncrypter, precisa ter as funções
   - generateToken() -- vai gerar o acess_token e o refresh_token
   - verify() -- vai usar o jwtService para verificar o token
   - decode() -- return this.jwtService.decode(token) as Record<string, unknown> | null;

-  no endpoint de refresh token
   - verificar se o jwt é valido
   - se for valido pega o payload que vai ter o sub ( sub vai ser o user.id )
  - com o sub, buscar usuario com o repositorio de usuarios
  - aps verificar que usuario existe, criar tokens com generateToken() e retornar o acess e refresh