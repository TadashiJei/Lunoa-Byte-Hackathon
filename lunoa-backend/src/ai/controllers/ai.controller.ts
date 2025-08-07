import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from '../services/ai.service';
import { Express } from 'express';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('trust-score')
  @HttpCode(HttpStatus.OK)
  async calculateTrustScore(@Body() data: any) {
    return this.aiService.calculateTrustScore(data);
  }

  @Post('project-match')
  @HttpCode(HttpStatus.OK)
  async findProjectMatches(@Body() data: any) {
    return this.aiService.findProjectMatches(data);
  }

  @Post('face-analysis')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeFace(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.aiService.analyzeFace(file);
  }

  @Post('ocr-extract')
  @UseInterceptors(FileInterceptor('file'))
  async extractText(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.aiService.extractText(file);
  }

  @Post('documents')
  @HttpCode(HttpStatus.CREATED)
  async createDocumentCollection(@Body() data: any) {
    return this.aiService.createDocumentCollection(data);
  }

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('pdf_file'))
  async uploadPdf(@UploadedFile() pdf_file: any, @Body('collection') collection: string) {
    if (!pdf_file || !collection) {
      throw new BadRequestException('PDF file and collection name are required');
    }
    return this.aiService.uploadPdf(pdf_file, collection);
  }

  @Get('chat/session')
  async createChatSession() {
    return this.aiService.createChatSession();
  }

  @Post('chat/message')
  @HttpCode(HttpStatus.OK)
  async sendChatMessage(@Body() data: any) {
    return this.aiService.sendChatMessage(data);
  }

  @Post('text-moderation')
  @HttpCode(HttpStatus.OK)
  async moderateText(@Body() data: any) {
    return this.aiService.moderateText(data);
  }

  @Post('text-summarizer')
  @HttpCode(HttpStatus.OK)
  async summarizeText(@Body() data: any) {
    return this.aiService.summarizeText(data);
  }

  @Post('text-generation')
  @HttpCode(HttpStatus.OK)
  async generateText(@Body() data: any) {
    return this.aiService.generateText(data);
  }

  @Post('translation')
  @HttpCode(HttpStatus.OK)
  async translateText(@Body() data: any) {
    return this.aiService.translateText(data);
  }

  @Post('speech-to-text')
  @UseInterceptors(FileInterceptor('audio'))
  async speechToText(@UploadedFile() audio: any) {
    if (!audio) {
      throw new BadRequestException('Audio file is required');
    }
    return this.aiService.speechToText(audio);
  }

  @Post('spam-detection')
  @HttpCode(HttpStatus.OK)
  async detectSpam(@Body() data: any) {
    return this.aiService.detectSpam(data);
  }

  @Post('sentiment-analysis')
  @HttpCode(HttpStatus.OK)
  async analyzeSentiment(@Body() data: any) {
    return this.aiService.analyzeSentiment(data);
  }
}
