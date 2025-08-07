import {
  Controller,
  Post,
  Body,
  Get,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HomomorphicEncryptionService } from '../services/homomorphic-encryption.service';
import { AdvancedHEService } from '../services/advanced-he.service';

@ApiTags('homomorphic-encryption')
@Controller('homomorphic-encryption')
export class HomomorphicEncryptionController {
  private readonly logger = new Logger(HomomorphicEncryptionController.name);

  constructor(
    private readonly heService: HomomorphicEncryptionService,
    private readonly advancedHeService: AdvancedHEService,
  ) {}

  @Post('encrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Encrypt data using homomorphic encryption',
    description: 'Encrypt sensitive data using Paillier encryption for homomorphic operations',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'string', description: 'Data to encrypt' },
        scheme: {
          type: 'string',
          enum: ['paillier', 'ckks', 'bfv'],
          description: 'Encryption scheme to use',
        },
      },
      required: ['data'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Data encrypted successfully',
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'Encrypted data with metadata' },
        scheme: { type: 'string', description: 'Encryption scheme used' },
      },
    },
  })
  async encrypt(@Body() body: { data: string; scheme?: string }) {
    try {
      const { data, scheme = 'paillier' } = body;
      const encryptedData = await this.heService.encrypt(data, scheme as any);

      return {
        encryptedData,
        scheme,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Encryption failed:', error);
      throw error;
    }
  }

  @Post('decrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Decrypt homomorphically encrypted data',
    description: 'Decrypt data that was encrypted using homomorphic encryption',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'Encrypted data to decrypt' },
      },
      required: ['encryptedData'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Data decrypted successfully',
    schema: {
      type: 'object',
      properties: {
        decryptedData: { type: 'string', description: 'Decrypted original data' },
        timestamp: { type: 'string', format: 'date-time' },
      },
    },
  })
  async decrypt(@Body() body: { encryptedData: any }) {
    try {
      const { encryptedData } = body;
      const decryptedData = await this.heService.decrypt(encryptedData);

      return {
        decryptedData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Decryption failed:', error);
      throw error;
    }
  }

  @Post('add')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Perform homomorphic addition',
    description: 'Add two encrypted values without decrypting them',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        encryptedA: { type: 'object', description: 'First encrypted operand' },
        encryptedB: { type: 'object', description: 'Second encrypted operand' },
      },
      required: ['encryptedA', 'encryptedB'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Addition performed successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'object', description: 'Encrypted result of addition' },
        operation: { type: 'string', description: 'Operation performed' },
      },
    },
  })
  async add(@Body() body: { encryptedA: any; encryptedB: any }) {
    try {
      const { encryptedA, encryptedB } = body;
      const result = await this.heService.add(encryptedA, encryptedB);

      return {
        result,
        operation: 'homomorphic_addition',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Homomorphic addition failed:', error);
      throw error;
    }
  }

  @Post('multiply')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Perform homomorphic scalar multiplication',
    description: 'Multiply encrypted value by scalar without decryption',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'Encrypted data to multiply' },
        scalar: { type: 'number', description: 'Scalar value to multiply by' },
      },
      required: ['encryptedData', 'scalar'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Multiplication performed successfully',
    schema: {
      type: 'object',
      properties: {
        result: { type: 'object', description: 'Encrypted result of multiplication' },
        operation: { type: 'string', description: 'Operation performed' },
      },
    },
  })
  async multiply(@Body() body: { encryptedData: any; scalar: number }) {
    try {
      const { encryptedData, scalar } = body;
      const result = await this.heService.multiply(encryptedData, scalar);

      return {
        result,
        operation: 'homomorphic_scalar_multiplication',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Homomorphic multiplication failed:', error);
      throw error;
    }
  }

  @Post('ckks-encrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'CKKS encryption for floating-point numbers',
    description: 'Encrypt floating-point data using CKKS scheme',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { type: 'number' },
          description: 'Array of floating-point numbers to encrypt',
        },
      },
      required: ['data'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'CKKS encryption performed successfully',
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'CKKS encrypted data' },
        slotCount: { type: 'number', description: 'Number of slots used' },
      },
    },
  })
  async ckksEncrypt(@Body() body: { data: number[] }) {
    try {
      const { data } = body;
      const encryptedData = await this.advancedHeService.ckksEncrypt(data);

      return {
        encryptedData,
        slotCount: encryptedData.slotCount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('CKKS encryption failed:', error);
      throw error;
    }
  }

  @Post('ckks-decrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'CKKS decryption for floating-point numbers',
    description: 'Decrypt CKKS encrypted floating-point data',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'CKKS encrypted data to decrypt' },
      },
      required: ['encryptedData'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'CKKS decryption performed successfully',
    schema: {
      type: 'object',
      properties: {
        decryptedData: {
          type: 'array',
          items: { type: 'number' },
          description: 'Decrypted floating-point numbers',
        },
      },
    },
  })
  async ckksDecrypt(@Body() body: { encryptedData: any }) {
    try {
      const { encryptedData } = body;
      const decryptedData = await this.advancedHeService.ckksDecrypt(encryptedData);

      return {
        decryptedData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('CKKS decryption failed:', error);
      throw error;
    }
  }

  @Post('bfv-encrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'BFV encryption for integers',
    description: 'Encrypt integer data using BFV scheme',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of integers as strings to encrypt',
        },
      },
      required: ['data'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'BFV encryption performed successfully',
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'BFV encrypted data' },
      },
    },
  })
  async bfvEncrypt(@Body() body: { data: string[] }) {
    try {
      const { data } = body;
      const bigintData = data.map(d => BigInt(d));
      const encryptedData = await this.advancedHeService.bfvEncrypt(bigintData);

      return {
        encryptedData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('BFV encryption failed:', error);
      throw error;
    }
  }

  @Post('bfv-decrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'BFV decryption for integers',
    description: 'Decrypt BFV encrypted integer data',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        encryptedData: { type: 'object', description: 'BFV encrypted data to decrypt' },
      },
      required: ['encryptedData'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'BFV decryption performed successfully',
    schema: {
      type: 'object',
      properties: {
        decryptedData: {
          type: 'array',
          items: { type: 'string' },
          description: 'Decrypted integers as strings',
        },
      },
    },
  })
  async bfvDecrypt(@Body() body: { encryptedData: any }) {
    try {
      const { encryptedData } = body;
      const decryptedData = await this.advancedHeService.bfvDecrypt(encryptedData);

      return {
        decryptedData: decryptedData.map(d => d.toString()),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('BFV decryption failed:', error);
      throw error;
    }
  }

  @Get('status')
  @ApiOperation({
    summary: 'Get homomorphic encryption service status',
    description: 'Check if homomorphic encryption services are operational',
  })
  @ApiResponse({
    status: 200,
    description: 'Service status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', description: 'Service status' },
        schemes: {
          type: 'array',
          items: { type: 'string' },
          description: 'Available encryption schemes',
        },
        validation: { type: 'boolean', description: 'Encryption validation status' },
      },
    },
  })
  async getStatus() {
    try {
      const validation = await this.advancedHeService.validateEncryption();
      
      return {
        status: 'operational',
        schemes: ['paillier', 'ckks', 'bfv'],
        validation,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Status check failed:', error);
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('batch-encrypt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Batch encrypt multiple values',
    description: 'Encrypt multiple values in a single operation',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of values to encrypt',
        },
        scheme: {
          type: 'string',
          enum: ['paillier', 'ckks', 'bfv'],
          description: 'Encryption scheme to use',
        },
      },
      required: ['data'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Batch encryption performed successfully',
    schema: {
      type: 'object',
      properties: {
        encryptedData: {
          type: 'array',
          items: { type: 'object' },
          description: 'Array of encrypted data',
        },
        count: { type: 'number', description: 'Number of encrypted values' },
      },
    },
  })
  async batchEncrypt(@Body() body: { data: string[]; scheme?: string }) {
    try {
      const { data, scheme = 'paillier' } = body;
      const encryptedData = await this.heService.batchEncrypt(data, scheme as any);

      return {
        encryptedData,
        count: encryptedData.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Batch encryption failed:', error);
      throw error;
    }
  }
}
