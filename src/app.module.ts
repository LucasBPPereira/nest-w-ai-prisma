import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { AiModule } from './config/ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './modules/core.module';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    AiModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
