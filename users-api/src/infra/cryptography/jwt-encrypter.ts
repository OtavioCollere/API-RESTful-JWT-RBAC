import { Injectable } from "@nestjs/common";
import type { Encrypter } from "../../domain/application/cryptograph/encrypter";
import { JwtService } from "@nestjs/jwt";
import type { UsersRepository } from "../../domain/application/repositories/users-repository";

@Injectable()
export class JwtEncrypter implements Encrypter{
    constructor(
      private jwtService : JwtService,
      private usersRepository : UsersRepository
    ) {}

    async generateToken(payload: Record<string, unknown>): Promise<{ access_token: string; refresh_token: string; }> {
      const access_token = await this.jwtService.sign(payload,
      {
        expiresIn : '10m'
      }
    )

    const refresh_token = await this.jwtService.sign(payload,
      {
        expiresIn : "10d"
      }
    )
    
    return{
      access_token,
      refresh_token
    }

  }

  async verify(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token); // lança erro se inválido
      return true;
    } catch {
      return false;
    }
  }

  decode(token: string): Record<string, unknown> | null {
    return this.jwtService.decode(token) as Record<string, unknown> | null;
  }

}