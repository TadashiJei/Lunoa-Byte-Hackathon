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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { AiService } from '../services/ai.service';
import { Express } from 'express';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('trust-score')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate AI-powered trust score', description: 'Calculate trust score for a user based on transaction history and profile data using Byte Forward AI services' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', description: 'User ID to calculate trust score for' },
        transactionHistory: { type: 'array', description: 'User transaction history' },
        userProfile: { type: 'object', description: 'User profile information' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Trust score calculated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async calculateTrustScore(@Body() data: any) {
    return this.aiService.calculateTrustScore(data);
  }

  @Post('project-match')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find AI-powered project matches', description: 'Find suitable project matches based on project description and required skills using AI' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        projectDescription: { type: 'string', description: 'Description of the project' },
        requiredSkills: { type: 'array', items: { type: 'string' }, description: 'Required skills for the project' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Project matches found successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async findProjectMatches(@Body() data: any) {
    return this.aiService.findProjectMatches(data);
  }

  @Post('face-analysis')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Analyze face using AI', description: 'Perform face analysis on uploaded image using Byte Forward AI face analysis service' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file for face analysis'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Face analysis completed successfully' })
  @ApiResponse({ status: 400, description: 'No file provided' })
  async analyzeFace(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.aiService.analyzeFace(file);
  }

  @Post('ocr-extract')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Extract text from image using OCR', description: 'Extract text content from uploaded image using Byte Forward AI OCR service' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file for OCR text extraction'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Text extracted successfully' })
  @ApiResponse({ status: 400, description: 'No file provided' })
  async extractText(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.aiService.extractText(file);
  }

  @Post('documents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create document collection', description: 'Create a new document collection using Byte Forward AI document processing service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', description: 'Document collection data' }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Document collection created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createDocumentCollection(@Body() data: any) {
    return this.aiService.createDocumentCollection(data);
  }

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('pdf_file'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload PDF document', description: 'Upload and process PDF documents using Byte Forward AI document processing service' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pdf_file: {
          type: 'string',
          format: 'binary',
          description: 'PDF file to upload'
        },
        collection: {
          type: 'string',
          description: 'Collection name for document storage'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'PDF uploaded and processed successfully' })
  @ApiResponse({ status: 400, description: 'PDF file and collection name are required' })
  async uploadPdf(@UploadedFile() pdf_file: any, @Body('collection') collection: string) {
    if (!pdf_file || !collection) {
      throw new BadRequestException('PDF file and collection name are required');
    }
    return this.aiService.uploadPdf(pdf_file, collection);
  }

  @Get('chat/session')
  @ApiOperation({ summary: 'Create chat session', description: 'Create a new chat session using Byte Forward AI chat service' })
  @ApiResponse({ status: 200, description: 'Chat session created successfully' })
  async createChatSession() {
    return this.aiService.createChatSession();
  }

  @Post('chat/message')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send chat message', description: 'Send a message in a chat session using Byte Forward AI chat service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', description: 'Chat message data' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Chat message sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async sendChatMessage(@Body() data: any) {
    return this.aiService.sendChatMessage(data);
  }

  @Post('text-moderation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Moderate text content', description: 'Analyze text content for inappropriate content using Byte Forward AI moderation service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text content to moderate' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Text moderation completed successfully' })
  @ApiResponse({ status: 400, description: 'Text is required' })
  async moderateText(@Body('text') text: string) {
    if (!text) {
      throw new BadRequestException('Text is required');
    }
    return this.aiService.moderateText(text);
  }

  @Post('text-summarizer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Summarize text content', description: 'Summarize text content using Byte Forward AI summarization service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text content to summarize' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Text summarized successfully' })
  @ApiResponse({ status: 400, description: 'Text is required' })
  async summarizeText(@Body('text') text: string) {
    if (!text) {
      throw new BadRequestException('Text is required');
    }
    return this.aiService.summarizeText(text);
  }

  @Post('text-generation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate text content', description: 'Generate text content using Byte Forward AI text generation service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', description: 'Text generation data' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Text generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async generateText(@Body() data: any) {
    return this.aiService.generateText(data);
  }

  @Post('translation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Translate text content', description: 'Translate text content using Byte Forward AI translation service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', description: 'Translation data' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Text translated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async translateText(@Body() data: any) {
    return this.aiService.translateText(data);
  }

  @Post('speech-to-text')
  @UseInterceptors(FileInterceptor('audio'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Convert speech to text', description: 'Convert audio speech to text using Byte Forward AI speech-to-text service' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
          description: 'Audio file for speech-to-text conversion'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Speech converted to text successfully' })
  @ApiResponse({ status: 400, description: 'Audio file is required' })
  async speechToText(@UploadedFile() audio: any) {
    if (!audio) {
      throw new BadRequestException('Audio file is required');
    }
    return this.aiService.speechToText(audio);
  }

  @Post('spam-detection')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Detect spam content', description: 'Detect spam content in text using Byte Forward AI spam detection service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text content to check for spam' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Spam detection completed successfully' })
  @ApiResponse({ status: 400, description: 'Text is required' })
  async detectSpam(@Body('text') text: string) {
    if (!text) {
      throw new BadRequestException('Text is required');
    }
    return this.aiService.detectSpam(text);
  }

  @Post('sentiment-analysis')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Analyze sentiment', description: 'Analyze sentiment of text content using Byte Forward AI sentiment analysis service' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text content to analyze sentiment' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Sentiment analysis completed successfully' })
  @ApiResponse({ status: 400, description: 'Text is required' })
  async analyzeSentiment(@Body('text') text: string) {
    if (!text) {
      throw new BadRequestException('Text is required');
    }
    return this.aiService.analyzeSentiment(text);
  }
}
