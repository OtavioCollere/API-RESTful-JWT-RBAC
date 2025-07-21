import type { Encrypter } from "../../src/domain/application/cryptograph/encrypter";

export class FakeEncrypter implements Encrypter{

  async generateToken(payload: Record<string, unknown>): Promise<{ access_token: string; refresh_token: string; }> {
    const base = JSON.stringify(payload);

    return {
      access_token: `access-${base}`,
      refresh_token: `refresh-${base}`,
    };
  }

  async verify(token: string): Promise<boolean> {
    try {
      const prefix = token.startsWith("access-") || token.startsWith("refresh-");
      const json = token.replace(/^access-|^refresh-/, '');
      JSON.parse(json); // vai lançar erro se não for um JSON válido
      return prefix;
    } catch {
      return false;
    }
  }

  decode<T extends object = Record<string, unknown>>(token: string): T | null {
    try {
      const json = token.replace(/^access-|^refresh-/, '');
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }
}