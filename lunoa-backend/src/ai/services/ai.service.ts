import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class AiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('BYTE_FORWARD_BASE_URL', 'https://ai-tools.rev21labs.com/api/v1') || 'https://ai-tools.rev21labs.com/api/v1';
    this.apiKey = this.configService.get<string>('BYTE_FORWARD_API_KEY') || '';
  }

  private async makeRequest(method: string, endpoint: string, data?: any, file?: Express.Multer.File) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'x-api-key': this.apiKey,
      ...data?.headers,
    };

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
        
        if (data) {
          Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
          });
        }

        response = await axios.post(url, formData, {
          headers: {
            ...headers,
            ...formData.getHeaders(),
          },
        });
      } else {
        response = await axios({
          method,
          url,
          headers,
          data,
        });
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  async calculateTrustScore(data: any) {
    // This would integrate with Byte Forward's trust calculation
    // For now, we'll use mock data for testing
    return {
      trust_score: 85,
      factors: {
        identity_verification: 90,
        transaction_history: 80,
        profile_completeness: 95,
        social_connections: 75,
      },
      recommendations: [
        'Complete profile verification',
        'Add more social connections',
        'Complete more transactions',
      ],
    };
  }

  async findProjectMatches(data: any) {
    // Mock implementation for project matching
    return {
      matches: [
        {
          user_id: 'user-123',
          score: 92,
          skills: ['nestjs', 'react', 'postgresql'],
          experience: '5 years',
          hourly_rate: 50,
        },
        {
          user_id: 'user-456',
          score: 88,
          skills: ['nestjs', 'vue', 'mongodb'],
          experience: '3 years',
          hourly_rate: 35,
        },
      ],
      total_matches: 2,
      filters_applied: data,
    };
  }

  async analyzeFace(file: Express.Multer.File) {
    return this.makeRequest('POST', '/vision/face-analysis', null, file);
  }

  async extractText(file: Express.Multer.File) {
    return this.makeRequest('POST', '/vision/ocr-extract', null, file);
  }

  async createDocumentCollection(data: any) {
    return this.makeRequest('POST', '/rag/documents', data);
  }

  async uploadPdf(file: Express.Multer.File, collection: string) {
    return this.makeRequest('POST', '/rag/upload-pdf', { collection }, file);
  }

  async createChatSession() {
    return this.makeRequest('GET', '/chat/session');
  }

  async sendChatMessage(data: any) {
    return this.makeRequest('POST', '/chat/message', data);
  }

  async moderateText(data: any) {
    return this.makeRequest('POST', '/text/moderation', data);
  }

  async summarizeText(data: any) {
    return this.makeRequest('POST', '/text/summarizer', data);
  }

  async generateText(data: any) {
    return this.makeRequest('POST', '/text/generation', data);
  }

  async translateText(data: any) {
    return this.makeRequest('POST', '/text/translation', data);
  }

  async speechToText(file: Express.Multer.File) {
    return this.makeRequest('POST', '/speech/speech-to-text', null, file);
  }

  async detectSpam(data: any) {
    return this.makeRequest('POST', '/text/spam-detection', data);
  }

  async analyzeSentiment(data: any) {
    return this.makeRequest('POST', '/text/sentiment-analysis', data);
  }
}
