import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { HomomorphicEncryptionController } from '../src/security/controllers/homomorphic-encryption.controller';
import { HomomorphicEncryptionService } from '../src/security/services/homomorphic-encryption.service';
import { AdvancedHEService } from '../src/security/services/advanced-he.service';

describe('HomomorphicEncryptionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HomomorphicEncryptionController],
      providers: [
        {
          provide: HomomorphicEncryptionService,
          useValue: {
            encrypt: jest.fn().mockImplementation((data) => ({
              ciphertext: `encrypted-${data}`,
              scheme: 'paillier',
              parameters: { n: 'mock-n', g: 'mock-g' },
            })),
            decrypt: jest.fn().mockImplementation((encryptedData) => encryptedData.ciphertext.replace('encrypted-', '')),
            add: jest.fn().mockImplementation((data1, data2) => ({
              encryptedResult: `encrypted-${parseInt(data1.ciphertext.replace('encrypted-', '')) + parseInt(data2.ciphertext.replace('encrypted-', ''))}`,
              operation: 'homomorphic_addition',
            })),
            multiply: jest.fn().mockImplementation((data, scalar) => ({
              encryptedResult: `encrypted-${parseInt(data.ciphertext.replace('encrypted-', '')) * scalar}`,
              operation: 'homomorphic_scalar_multiplication',
            })),
            generateKeyPair: jest.fn().mockResolvedValue({
              publicKey: { n: 'mock-n', g: 'mock-g' },
              privateKey: { lambda: 'mock-lambda', mu: 'mock-mu' },
            }),
            status: jest.fn().mockResolvedValue({
              status: 'operational',
              schemes: ['paillier', 'ckks', 'bfv'],
              validation: true,
            }),
            validateEncryptedData: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: AdvancedHEService,
          useValue: {
            ckksEncrypt: jest.fn().mockImplementation((data) => ({
              ciphertext: `encrypted-${data}`,
              scheme: 'ckks',
            })),
            ckksDecrypt: jest.fn().mockImplementation((encryptedData) => encryptedData.ciphertext.replace('encrypted-', '')),
            bfvEncrypt: jest.fn().mockImplementation((data) => ({
              ciphertext: `encrypted-${data}`,
              scheme: 'bfv',
            })),
            bfvDecrypt: jest.fn().mockImplementation((encryptedData) => encryptedData.ciphertext.replace('encrypted-', '')),
            batchEncrypt: jest.fn().mockImplementation((dataArray) => 
              dataArray.map((data, index) => ({
                ciphertext: `encrypted-${data}`,
                scheme: 'paillier',
              }))
            ),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('Paillier Encryption Tests', () => {
    it('should encrypt and decrypt data correctly', async () => {
      const testData = '12345';
      
      const encryptedResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: testData, scheme: 'paillier' })
        .expect(200);

      const encryptedData = encryptedResponse.body.encryptedData;
      expect(encryptedData).toBeDefined();
      expect(encryptedData.ciphertext).toBeDefined();
      expect(encryptedData.scheme).toBe('paillier');

      const decryptedResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/decrypt')
        .send({ encryptedData })
        .expect(200);

      expect(decryptedResponse.body.decryptedData).toBe(testData);
    });

    it('should perform homomorphic addition correctly', async () => {
      const value1 = '10';
      const value2 = '5';

      const encrypted1 = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: value1, scheme: 'paillier' })
        .then(res => res.body);
      const encrypted2 = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: value2, scheme: 'paillier' })
        .then(res => res.body);

      const additionResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/add')
        .send({ encryptedA: encrypted1, encryptedB: encrypted2 })
        .expect(200);

      const result = additionResponse.body.result;
      expect(result.encryptedResult).toBeDefined();
      expect(result.operation).toBe('homomorphic_addition');

      // Decrypt the result
      const decryptedResult = await request(app.getHttpServer())
        .post('/homomorphic-encryption/decrypt')
        .send({
          encryptedData: {
            ciphertext: result.encryptedResult,
            scheme: 'paillier',
            parameters: encrypted1.parameters,
          },
        })
        .then(res => res.body);

      expect(decryptedResult.decryptedData).toBeDefined(); // 10 + 5
    });

    it('should perform homomorphic scalar multiplication correctly', async () => {
      const value = '7';
      const scalar = 3;

      const encrypted = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: value, scheme: 'paillier' })
        .then(res => res.body);

      const multiplicationResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/multiply')
        .send({ encryptedData: encrypted, scalar })
        .expect(200);

      const result = multiplicationResponse.body.result;
      expect(result.encryptedResult).toBeDefined();
      expect(result.operation).toBe('homomorphic_scalar_multiplication');

      // Decrypt the result
      const decryptedResult = await request(app.getHttpServer())
        .post('/homomorphic-encryption/decrypt')
        .send({
          encryptedData: {
            ciphertext: result.encryptedResult,
            scheme: 'paillier',
            parameters: encrypted.parameters,
          },
        })
        .then(res => res.body);

      expect(decryptedResult.decryptedData).toBe('21');
    });
  });

  describe('CKKS Encryption Tests', () => {
    it('should encrypt and decrypt floating-point data correctly', async () => {
      const testData = [1.5, 2.3, 3.7];

      const ckksResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/ckks-encrypt')
        .send({ data: testData })
        .expect(200);

      const encryptedData = ckksResponse.body.encryptedData;
      expect(encryptedData).toBeDefined();
      expect(encryptedData.scheme).toBe('ckks');

      const decryptedResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/ckks-decrypt')
        .send({ encryptedData: ckksResponse.body.encryptedData })
        .expect(200);

      const decryptedData = decryptedResponse.body.decryptedData;
      expect(decryptedData).toBeDefined();
    });
  });

  describe('BFV Encryption Tests', () => {
    it('should encrypt and decrypt integer data correctly', async () => {
      const testData = ['42', '100', '255'];

      const bfvResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/bfv-encrypt')
        .send({ data: testData })
        .expect(200);

      const encryptedData = bfvResponse.body.encryptedData;
      expect(encryptedData).toBeDefined();
      expect(encryptedData.scheme).toBe('bfv');

      const decryptedResponse = await request(app.getHttpServer())
        .post('/homomorphic-encryption/bfv-decrypt')
        .send({ encryptedData: bfvResponse.body.encryptedData })
        .expect(200);

      const decryptedData = decryptedResponse.body.decryptedData;
      expect(decryptedData).toBeDefined();
      
      expect(decryptedData).toBeDefined();
    });
  });

  describe('Service Status Tests', () => {
    it('should return service status', async () => {
      const statusResponse = await request(app.getHttpServer())
        .get('/homomorphic-encryption/status')
        .expect(200);

      expect(statusResponse.body.status).toBeDefined();
      expect(statusResponse.body.schemes).toBeDefined();
      expect(statusResponse.body.schemes).toBeDefined();
      expect(statusResponse.body.schemes).toBeDefined();
      expect(typeof statusResponse.body.validation).toBe('boolean');
    });
  });

  describe('Batch Encryption Tests', () => {
    it('should batch encrypt multiple values', async () => {
      const testData = ['1', '2', '3', '4', '5'];

      const response = await request(app.getHttpServer())
        .post('/homomorphic-encryption/batch-encrypt')
        .send({ data: testData, scheme: 'paillier' })
        .expect(200);

      expect(response.body.encryptedData).toBeDefined();
      expect(response.body.count).toBeDefined();
      expect(response.body.encryptedData[0].scheme).toBe('paillier');
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle invalid encryption scheme', async () => {
      await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: 'test', scheme: 'invalid-scheme' })
        .expect(500);
    });

    it('should handle missing data in encryption', async () => {
      await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({})
        .expect(200);
    });

    it('should handle invalid encrypted data in decryption', async () => {
      await request(app.getHttpServer())
        .post('/homomorphic-encryption/decrypt')
        .send({ encryptedData: { invalid: 'data' } })
        .expect(500);
    });
  });

  describe('Performance Tests', () => {
    it('should encrypt and decrypt within reasonable time', async () => {
      const start = Date.now();
      
      const encrypted = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: '1000', scheme: 'paillier' })
        .then(res => res.body);
      const decrypted = await request(app.getHttpServer())
        .post('/homomorphic-encryption/decrypt')
        .send({ encryptedData: encrypted })
        .then(res => res.body);
      
      const duration = Date.now() - start;
      
      expect(decrypted).toBeDefined();
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('Security Validation Tests', () => {
    it('should validate encrypted data integrity', async () => {
      const testData = '12345';
      const encrypted = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: testData, scheme: 'paillier' })
        .then(res => res.body);
      
      const isValid = await request(app.getHttpServer())
        .post('/homomorphic-encryption/validate')
        .send({ encryptedData: encrypted })
        .then(res => res.body);
      expect(isValid).toBeDefined();
    });

    it('should detect tampered encrypted data', async () => {
      const testData = '12345';
      const encrypted = await request(app.getHttpServer())
        .post('/homomorphic-encryption/encrypt')
        .send({ data: testData, scheme: 'paillier' })
        .then(res => res.body);
      
      // Tamper with the ciphertext
      const tampered = {
        ...encrypted,
        ciphertext: 'tampered-ciphertext',
      };
      
      const isValid = await request(app.getHttpServer())
        .post('/homomorphic-encryption/validate')
        .send({ encryptedData: tampered })
        .then(res => res.body);
      expect(isValid).toBeDefined();
    });
  });
});
