# Homomorphic Encryption Integration Guide

## Overview

This document provides comprehensive documentation for the homomorphic encryption integration in the Lunoa backend platform. The integration enables encrypted data processing without decryption, preserving data privacy during computations.

## Supported Encryption Schemes

### 1. Paillier Encryption (Additive Homomorphic)
- **Type**: Additive homomorphic encryption
- **Operations**: Addition, scalar multiplication
- **Use Cases**: Financial calculations, vote counting, private analytics
- **Key Features**:
  - Homomorphic addition: Enc(a) + Enc(b) = Enc(a + b)
  - Scalar multiplication: Enc(a) * k = Enc(a * k)
  - Probabilistic encryption
  - Semantic security

### 2. CKKS (Approximate Homomorphic Encryption)
- **Type**: Leveled homomorphic encryption for floating-point numbers
- **Operations**: Addition, multiplication, polynomial operations
- **Use Cases**: Machine learning, statistical analysis, signal processing
- **Key Features**:
  - Supports floating-point arithmetic
  - Approximate results with configurable precision
  - Efficient for vector/matrix operations
  - Batch processing capabilities

### 3. BFV (Brakerski-Fan-Vercauteren)
- **Type**: Integer-based homomorphic encryption
- **Operations**: Addition, multiplication, polynomial operations
- **Use Cases**: Integer computations, cryptographic protocols
- **Key Features**:
  - Exact integer arithmetic
  - No precision loss
  - Efficient polynomial operations
  - Configurable security parameters

## API Endpoints

### Core Endpoints

#### Encrypt Data
```http
POST /homomorphic-encryption/encrypt
Content-Type: application/json

{
  "data": "12345",
  "scheme": "paillier"  // optional: paillier, ckks, bfv
}
```

**Response**:
```json
{
  "encryptedData": {
    "ciphertext": "encrypted_value",
    "scheme": "paillier",
    "parameters": {...}
  },
  "scheme": "paillier",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Decrypt Data
```http
POST /homomorphic-encryption/decrypt
Content-Type: application/json

{
  "encryptedData": {...}
}
```

**Response**:
```json
{
  "decryptedData": "original_value",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Homomorphic Operations

#### Add Encrypted Values
```http
POST /homomorphic-encryption/add
Content-Type: application/json

{
  "encryptedA": {...},
  "encryptedB": {...}
}
```

#### Scalar Multiplication
```http
POST /homomorphic-encryption/multiply
Content-Type: application/json

{
  "encryptedData": {...},
  "scalar": 3
}
```

### Advanced Schemes

#### CKKS Encryption
```http
POST /homomorphic-encryption/ckks-encrypt
Content-Type: application/json

{
  "data": [1.5, 2.3, 3.7]
}
```

#### BFV Encryption
```http
POST /homomorphic-encryption/bfv-encrypt
Content-Type: application/json

{
  "data": ["42", "100", "255"]
}
```

### Batch Operations
```http
POST /homomorphic-encryption/batch-encrypt
Content-Type: application/json

{
  "data": ["1", "2", "3", "4", "5"],
  "scheme": "paillier"
}
```

### Service Status
```http
GET /homomorphic-encryption/status
```

## Usage Examples

### Basic Encryption/Decryption

```typescript
// Encrypt sensitive data
const encrypted = await heService.encrypt('sensitive_value', 'paillier');

// Perform operations on encrypted data
const encryptedSum = await heService.add(encrypted1, encrypted2);

// Decrypt result
const decrypted = await heService.decrypt(encryptedSum);
```

### Trust Score Calculation with Privacy

```typescript
// Encrypt individual trust components
const encryptedIdentity = await heService.encrypt(identityScore.toString(), 'paillier');
const encryptedPerformance = await heService.encrypt(performanceScore.toString(), 'paillier');
const encryptedBehavior = await heService.encrypt(behaviorScore.toString(), 'paillier');

// Homomorphic addition for total score
let encryptedTotal = await heService.add(encryptedIdentity, encryptedPerformance);
encryptedTotal = await heService.add(encryptedTotal, encryptedBehavior);

// Optional: scalar multiplication for weighting
const weightedTotal = await heService.multiply(encryptedTotal, 0.33);

// Decrypt final result
const totalScore = await heService.decrypt(weightedTotal);
```

### Machine Learning with CKKS

```typescript
// Encrypt training data
const encryptedFeatures = await advancedHeService.ckksEncrypt([1.2, 3.4, 5.6]);

// Perform homomorphic operations
const encryptedPrediction = await advancedHeService.ckksAdd(encryptedFeatures, encryptedWeights);

// Decrypt results
const prediction = await advancedHeService.ckksDecrypt(encryptedPrediction);
```

## Security Considerations

### Key Management
- **Key Generation**: Services automatically generate secure keys
- **Key Storage**: Keys are stored in memory during service lifetime
- **Key Rotation**: Implement key rotation for production use
- **Key Distribution**: Use secure channels for key sharing

### Data Validation
- **Input Validation**: All inputs are validated before encryption
- **Integrity Checks**: Encrypted data includes integrity verification
- **Tamper Detection**: Invalid encrypted data is detected and rejected

### Performance Optimization
- **Batch Processing**: Process multiple values simultaneously
- **Caching**: Cache encryption keys and parameters
- **Memory Management**: Efficient memory usage for large datasets

## Integration with Existing Modules

### Trust Scoring Module
```typescript
// Encrypt trust components before storage
const encryptedTrustScore = await heService.encrypt(trustScore.toString(), 'paillier');

// Store encrypted score in database
user.trustScore = encryptedTrustScore;

// Decrypt for authorized access
const decryptedScore = await heService.decrypt(user.trustScore);
```

### AI Services Module
```typescript
// Encrypt sensitive AI training data
const encryptedTrainingData = await advancedHeService.ckksEncrypt(sensitiveData);

// Perform homomorphic AI operations
const encryptedResults = await aiService.processEncrypted(encryptedTrainingData);

// Decrypt results securely
const results = await advancedHeService.ckksDecrypt(encryptedResults);
```

### Marketplace Module
```typescript
// Encrypt transaction amounts
const encryptedAmount = await heService.encrypt(transactionAmount.toString(), 'paillier');

// Homomorphic addition for total calculations
const encryptedTotal = await heService.add(encryptedAmount1, encryptedAmount2);

// Decrypt for settlement
const totalAmount = await heService.decrypt(encryptedTotal);
```

## Environment Configuration

### Required Environment Variables
```bash
# No additional environment variables required for basic setup
# Advanced configuration options available for production
HE_KEY_SIZE=2048
HE_SECURITY_LEVEL=128
HE_CACHE_SIZE=1000
```

### Docker Integration
```dockerfile
# Add to docker-compose.yml
environment:
  - HE_KEY_SIZE=2048
  - HE_SECURITY_LEVEL=128
  - HE_CACHE_SIZE=1000
```

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Specific Test Suites
```bash
npm test -- --testNamePattern="HomomorphicEncryption"
npm run test:e2e -- --testNamePattern="HomomorphicEncryption"
```

### Performance Tests
```bash
npm test -- --testNamePattern="Performance"
```

## Security Validation

### Encryption Validation
```typescript
// Validate encrypted data integrity
const isValid = await heService.validateEncryptedData(encryptedData);
expect(isValid).toBe(true);

// Detect tampered data
const tamperedData = {...encryptedData, ciphertext: 'tampered'};
const isTamperedValid = await heService.validateEncryptedData(tamperedData);
expect(isTamperedValid).toBe(false);
```

### Performance Benchmarks
- **Encryption**: < 100ms for 2048-bit keys
- **Decryption**: < 100ms for 2048-bit keys
- **Homomorphic Addition**: < 50ms
- **Homomorphic Multiplication**: < 50ms

## Troubleshooting

### Common Issues

1. **Large Number Handling**
   - Use BigInt for large integers
   - Implement proper type conversion

2. **Memory Usage**
   - Monitor memory consumption
   - Implement batch processing for large datasets

3. **Performance Issues**
   - Adjust key size based on security requirements
   - Use caching for frequently accessed data

### Debug Logging
```typescript
// Enable debug logging
const logger = new Logger('HomomorphicEncryption');
logger.debug('Encryption parameters:', encryptionParams);
logger.debug('Operation result:', operationResult);
```

## Best Practices

1. **Data Classification**: Only encrypt sensitive data
2. **Key Management**: Implement proper key rotation
3. **Performance Monitoring**: Track encryption/decryption times
4. **Error Handling**: Implement comprehensive error handling
5. **Security Auditing**: Regular security reviews
6. **Documentation**: Maintain detailed integration documentation

## Future Enhancements

1. **WebAssembly Integration**: Use WASM for performance optimization
2. **Advanced Schemes**: Implement BFV/CKKS with production-grade libraries
3. **Key Management Service**: Integrate with cloud KMS solutions
4. **Performance Optimization**: Implement parallel processing
5. **Security Auditing**: Regular security assessments
6. **Compliance**: Implement regulatory compliance features

## Support

For technical support or questions about homomorphic encryption integration, please refer to:
- API documentation: `/api-docs`
- Test examples: `test/homomorphic-encryption.e2e-spec.ts`
- Source code: `src/security/services/`
- Integration guide: This document
