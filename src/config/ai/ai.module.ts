import { Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';
import { AiService } from './ai.service';

@Module({
  imports: [GeminiModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
