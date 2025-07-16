import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { HttpModule } from './infra/http/http.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate : (env) => envSchema.parse(env),
      isGlobal: true
    }),
    AuthModule,
    HttpModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
