import { Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client/extension";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  constructor(){
    super()
  }

  async onModuleInit() {
    return this.$connect();
  }
  
  onModuleDestroy() {
    return this.$discconnect();
  }
}