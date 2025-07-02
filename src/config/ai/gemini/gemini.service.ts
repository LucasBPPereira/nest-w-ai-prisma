import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetAIMessageDTO } from './model/get-ai-response.dto';
import { v4 } from 'uuid';

const GEMINI_MODEL = 'gemini-1.5-flash';

@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;
  private chatSessions: { [sessionId: string]: ChatSession } = {};
  private readonly logger = new Logger(GeminiService.name);

  constructor(configService: ConfigService) {
    const geminiApiKey = configService.get<string>('GEMINI_API_KEY')!;
    this.googleAI = new GoogleGenerativeAI(geminiApiKey);
    this.model = this.googleAI.getGenerativeModel({
      model: GEMINI_MODEL,
    });
  }

  private getChatSession(sessionId?: string) {
    const sessionIdToUse = sessionId ?? v4();

    let result = this.chatSessions[sessionIdToUse];

    if (!result) {
      result = this.model.startChat();
      this.chatSessions[sessionIdToUse] = result;
    }

    return {
      sessionId: sessionIdToUse,
      chat: result,
    };
  }

  async generateText(data: GetAIMessageDTO) {
    try {
      if (data.sessionId === 'none') {
        const result = await this.model.generateContent(data.prompt);
        return result.response.text();
      }
      // const { chat, sessionId } = this.getChatSession(data.sessionId);

      // const result = await chat.sendMessage(data.prompt);

      // return {
      //   result: result.response.text(),
      //   sessionId,
      // };
    } catch (error) {
      this.logger.error('Error sending message to Gemini API >>', error);
    }
  }

  public async generateWithPrompt(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      this.logger.error('Error sending message to Gemini API >>', error);
      return 'Error, ' + error;
    }
  }
}
