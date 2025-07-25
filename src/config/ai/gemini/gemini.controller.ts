import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GetAIMessageDTO } from './model/get-ai-response.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly service: GeminiService) {}

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  getResponse(@Body() data: GetAIMessageDTO) {
    return this.service.generateText(data);
  }
}
