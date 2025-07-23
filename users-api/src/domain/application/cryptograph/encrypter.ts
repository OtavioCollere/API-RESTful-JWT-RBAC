import { Injectable } from "@nestjs/common";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export abstract class Encrypter{

  // Record : Tipo genérico do ts que descreve um objeto onde as caves sao strign e os valores podem ser qualquer coisa desconhecida
  // {
 // userId: 123,
 // email: "exemplo@teste.com",
 //  isAdmin: true
 // }
  abstract generateToken(payload: Record<string, unknown>): Promise<TokenResponse>;
  abstract verify(token : string) : Promise<Boolean>
  abstract decode<T extends object = Record<string, unknown>>(token: string): T | null;
}