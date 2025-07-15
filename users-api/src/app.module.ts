import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate : (env) => envSchema.parse(env),
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
