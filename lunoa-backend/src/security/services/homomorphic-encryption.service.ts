import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

export interface HomomorphicKeyPair {
  publicKey: string;
  privateKey: string;
  n: string;
  g: string;
  lambda: string;
  mu: string;
}

export interface EncryptedData {
  ciphertext: string;
  scheme: 'paillier' | 'ckks' | 'bfv';
  parameters: any;
}

export interface ComputationResult {
  encryptedResult: string;
  decryptedResult?: string;
  operation: string;
  timestamp: Date;
}

@Injectable()
export class HomomorphicEncryptionService {
  private readonly logger = new Logger(HomomorphicEncryptionService.name);
  private keyPair: HomomorphicKeyPair | null = null;
  private readonly primeBits: number = 2048;

  constructor(private configService: ConfigService) {
    this.initializeKeys();
  }

  /**
   * Initialize homomorphic encryption key pairs
   */
  private async initializeKeys(): Promise<void> {
    try {
      this.keyPair = await this.generatePaillierKeyPair();
      this.logger.log('Homomorphic encryption keys initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize homomorphic encryption keys:', error);
      throw error;
    }
  }

  /**
   * Generate Paillier key pair for additive homomorphic encryption
   */
  private async generatePaillierKeyPair(): Promise<HomomorphicKeyPair> {
    // Generate two large prime numbers p and q
    const p = this.generateLargePrime(this.primeBits / 2);
    const q = this.generateLargePrime(this.primeBits / 2);
    
    const n = p * q;
    const nSquared = n * n;
    
    // Generate g where g = n + 1 (common choice for Paillier)
    const g = n + 1n;
    
    // Calculate lambda = lcm(p-1, q-1)
    const lambda = this.lcm(p - 1n, q - 1n);
    
    // Calculate mu = (L(g^lambda mod n^2))^-1 mod n
    const mu = this.modInverse(
      this.lFunction(this.modPow(g, lambda, nSquared), n),
      n
    );

    return {
      publicKey: n.toString(),
      privateKey: lambda.toString(),
      n: n.toString(),
      g: g.toString(),
      lambda: lambda.toString(),
      mu: mu.toString()
    };
  }

  /**
   * Generate a large prime number
   */
  private generateLargePrime(bits: number): bigint {
    const prime = crypto.generatePrimeSync(bits, {
      bigint: true,
      safe: true
    });
    return prime;
  }

  /**
   * Calculate least common multiple
   */
  private lcm(a: bigint, b: bigint): bigint {
    return (a * b) / this.gcd(a, b);
  }

  /**
   * Calculate greatest common divisor
   */
  private gcd(a: bigint, b: bigint): bigint {
    while (b !== BigInt(0)) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  /**
   * Calculate modular inverse
   */
  private modInverse(a: bigint, m: bigint): bigint {
    const gcd = this.gcd(a, m);
    if (gcd !== BigInt(1)) {
      throw new Error('Modular inverse does not exist');
    }
    
    const result = this.extendedGcd(a, m).x;
    return ((result % m) + m) % m;
  }

  /**
   * Extended Euclidean algorithm
   */
  private extendedGcd(a: bigint, b: bigint): { x: bigint, y: bigint, gcd: bigint } {
    if (a === BigInt(0)) {
      return { x: BigInt(0), y: BigInt(1), gcd: b };
    }
    
    const result = this.extendedGcd(b % a, a);
    const x = result.y - (b / a) * result.x;
    const y = result.x;
    
    return { x, y, gcd: result.gcd };
  }

  /**
   * L function for Paillier cryptosystem
   */
  private lFunction(x: bigint, n: bigint): bigint {
    return (x - BigInt(1)) / n;
  }

  /**
   * Encrypt data using Paillier encryption
   */
  public async encrypt(data: string | number, scheme: 'paillier' | 'ckks' | 'bfv' = 'paillier'): Promise<EncryptedData> {
    if (!this.keyPair) {
      throw new Error('Homomorphic encryption keys not initialized');
    }

    try {
      const n = BigInt(this.keyPair.n);
      const g = BigInt(this.keyPair.g);
      const nSquared = n * n;
      
      // Convert data to BigInt
      const plaintext = BigInt(data);
      
      // Generate random r where 1 < r < n
      const r = this.generateRandomR(n);
      
      // Calculate ciphertext: c = g^m * r^n mod n^2
      const gm = this.modPow(g, plaintext, nSquared);
      const rn = this.modPow(r, n, nSquared);
      const ciphertext = (gm * rn) % nSquared;

      return {
        ciphertext: ciphertext.toString(),
        scheme,
        parameters: {
          n: n.toString(),
          g: g.toString(),
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      this.logger.error('Encryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypt data using Paillier decryption
   */
  public async decrypt(encryptedData: EncryptedData): Promise<string> {
    if (!this.keyPair) {
      throw new Error('Homomorphic encryption keys not initialized');
    }

    try {
      const n = BigInt(this.keyPair.n);
      const lambda = BigInt(this.keyPair.lambda);
      const mu = BigInt(this.keyPair.mu);
      const nSquared = n * n;
      
      const ciphertext = BigInt(encryptedData.ciphertext);
      
      // Calculate plaintext: m = L(c^lambda mod n^2) * mu mod n
      const clambda = this.modPow(ciphertext, lambda, nSquared);
      const lResult = this.lFunction(clambda, n);
      const plaintext = (lResult * mu) % n;

      return plaintext.toString();
    } catch (error) {
      this.logger.error('Decryption failed:', error);
      throw error;
    }
  }

  /**
   * Perform homomorphic addition on encrypted data
   */
  public async add(encryptedA: EncryptedData, encryptedB: EncryptedData): Promise<ComputationResult> {
    if (!this.keyPair) {
      throw new Error('Homomorphic encryption keys not initialized');
    }

    try {
      const n = BigInt(this.keyPair.n);
      const nSquared = n * n;
      
      const a = BigInt(encryptedA.ciphertext);
      const b = BigInt(encryptedB.ciphertext);
      
      // Homomorphic addition: c = a * b mod n^2
      const result = (a * b) % BigInt(nSquared.toString());

      return {
        encryptedResult: result.toString(),
        operation: 'addition',
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error('Homomorphic addition failed:', error);
      throw error;
    }
  }

  /**
   * Perform homomorphic scalar multiplication
   */
  public async multiply(encryptedData: EncryptedData, scalar: number): Promise<ComputationResult> {
    if (!this.keyPair) {
      throw new Error('Homomorphic encryption keys not initialized');
    }

    try {
      const n = BigInt(this.keyPair.n);
      const nSquared = n * n;
      
      const ciphertext = BigInt(encryptedData.ciphertext);
      const scalarBigInt = BigInt(scalar);
      
      // Homomorphic scalar multiplication: c = c^scalar mod n^2
      const result = this.modPow(ciphertext, scalarBigInt, nSquared);

      return {
        encryptedResult: result.toString(),
        operation: 'scalar_multiplication',
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error('Homomorphic multiplication failed:', error);
      throw error;
    }
  }

  /**
   * Generate random r for encryption
   */
  private generateRandomR(n: any): any {
    const max = n - BigInt(1);
    const randomBytes = crypto.randomBytes(256);
    let randomBigInt = BigInt('0x' + randomBytes.toString('hex'));
    
    return randomBigInt % max + BigInt(1);
  }

  /**
   * Modular exponentiation
   */
  private modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === BigInt(1)) return BigInt(0);
    
    let result = BigInt(1);
    base = base % modulus;
    
    while (exponent > 0) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * base) % modulus;
      }
      exponent = exponent >> BigInt(1);
      base = (base * base) % modulus;
    }
    
    return result;
  }

  /**
   * Batch encrypt array of data
   */
  public async batchEncrypt(dataArray: (string | number)[], scheme: 'paillier' | 'ckks' | 'bfv' = 'paillier'): Promise<EncryptedData[]> {
    const promises = dataArray.map(data => this.encrypt(data, scheme));
    return Promise.all(promises);
  }

  /**
   * Get current key pair for verification
   */
  public getKeyPair(): HomomorphicKeyPair | null {
    return this.keyPair;
  }

  /**
   * Regenerate keys for security rotation
   */
  public async regenerateKeys(): Promise<void> {
    this.keyPair = await this.generatePaillierKeyPair();
    this.logger.log('Homomorphic encryption keys regenerated');
  }

  /**
   * Validate encrypted data integrity
   */
  public async validateEncryptedData(encryptedData: EncryptedData): Promise<boolean> {
    try {
      const decrypted = await this.decrypt(encryptedData);
      const reEncrypted = await this.encrypt(decrypted, encryptedData.scheme);
      
      return encryptedData.ciphertext === reEncrypted.ciphertext;
    } catch (error) {
      this.logger.error('Encrypted data validation failed:', error);
      return false;
    }
  }
}
