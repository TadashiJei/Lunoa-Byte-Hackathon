# Lunoa AI Services Integration Plan (Byte Forward Hackathon)

This document outlines how to integrate the AI services provided by the Byte Forward Hackathon into the Lunoa platform. 

## Service Mapping

Here is a breakdown of which AI services map to Lunoa's core features:

### 1. Trust Engine & Verification System 🛡️

**Objective**: Automate and strengthen the user verification and trust scoring processes.

| Service | Integration Point | Purpose |
|---|---|---|
| **Face Analysis** | User Onboarding (KYC) | Verify user identity by matching a live selfie with their government-issued ID photo. |
| **OCR Text Extraction** | User Onboarding (KYC) | Extract text from uploaded IDs, business permits, and certificates to automate data entry and verification. |
| **Document Scanner** | Credential Verification | Extract structured data from official documents to validate business credentials automatically. |
| **Sentiment Analysis** | Dynamic Trust Score | Analyze client reviews and messages to gauge sentiment, which feeds into the behavioral component of the Trust Score. |
| **Spam Detection** | User Registration | Proactively identify and flag potentially fraudulent or spam accounts during the sign-up process. |

### 2. Security Shield 🔐

**Objective**: Enhance real-time threat detection and content monitoring.

| Service | Integration Point | Purpose |
|---|---|---|
| **Text Moderation** | Communication Hub | Scan all user-generated text (messages, profiles) to detect and filter harmful or inappropriate content. |
| **Text Summarizer** | Security Dashboard | Generate concise summaries of security incident logs for quick review and action by administrators. |

### 3. Smart Marketplace & Communication 🧠

**Objective**: Improve user experience, accessibility, and platform intelligence.

| Service | Integration Point | Purpose |
|---|---|---|
| **Text Generation** | Profile & Project Creation | Assist users in writing professional-sounding bios and project descriptions based on simple inputs. |
| **Translation Service** | Communication Hub | Provide real-time translation for messages and project descriptions to facilitate cross-lingual collaboration. |
| **Speech to Text** | Video Conferencing | Transcribe meetings and voice notes, making them searchable and creating accessible records of communication. |
| **Chat Service** | Customer Support | Deploy an AI-powered chatbot to handle user queries, guide them through the platform, and resolve common issues. |

## API Documentation & Implementation

### Base URL
```
https://ai-tools.rev21labs.com/api/v1
```

### Authentication
All API requests require an API key in the header:
```
x-api-key: {{GW_API_KEY}}
```

### 1. Face Analysis API

**Endpoint**: `POST /vision/face-analysis`

**Purpose**: Verify user identity by analyzing facial features from uploaded ID photos and selfies.

**Parameters**:
- `file` (required): Image file (PNG, JPEG, WEBP)

**Response Structure**:
```json
{
  "facial_features": {
    "face_shape": "oval / round / square / heart / diamond / rectangular",
    "eyes": {
      "shape": "almond / round / hooded / monolid / upturned / downturned",
      "size": "small / medium / large",
      "spacing": "close-set / average / wide-set",
      "color": "black / brown / amber / hazel / green / blue / grey"
    },
    "eyebrows": {
      "shape": "arched / straight / curved / angled",
      "thickness": "thin / medium / thick",
      "distance_from_eyes": "close / average / high"
    },
    "nose": {
      "shape": "straight / hooked / button / upturned / aquiline / bulbous",
      "width": "narrow / average / wide",
      "bridge_height": "low / medium / high"
    },
    "lips": {
      "shape": "bow-shaped / rounded / flat / wide",
      "fullness": "thin / medium / full",
      "symmetry": "symmetric / slightly asymmetric / asymmetric"
    },
    "cheekbones": {
      "height": "low / medium / high",
      "definition": "subtle / defined / prominent"
    },
    "jawline": {
      "shape": "square / round / angular / tapered",
      "definition": "soft / medium / sharp"
    },
    "chin": {
      "shape": "rounded / pointed / cleft / square",
      "prominence": "recessed / average / prominent"
    },
    "forehead": {
      "size": "small / medium / large",
      "hairline_shape": "straight / rounded / widow's peak / M-shaped"
    }
  },
  "skin_features": {
    "skin_tone": {
      "base_tone": "fair / medium / olive / dark",
      "undertone": "cool / neutral / warm",
      "color": "#000000-#FFFFFF"
    },
    "skin_texture": "smooth / slightly rough / rough",
    "pore_visibility": "invisible / small / medium / enlarged / clogged",
    "pigmentation": {
      "pigmentation_evenness": "even / mild unevenness / moderate / severe",
      "dark_spots_present": true,
      "freckles_present": false
    },
    "acne": {
      "acne_severity": "none / mild / moderate / severe",
      "active_lesions": 0,
      "acne_types_detected": ["whitehead", "blackhead", "papule", "pustule", "cyst"]
    }
  },
  "other_features": {
    "facial_symmetry": "high / moderate / low",
    "apparent_age_range": "20-30 / 30-40 / etc.",
    "emotional_impression": "gentle / intense / approachable / confident / mysterious",
    "race": "white / black / asian / latino / indigenous / middle eastern / pacific islander / mixed / other",
    "attractiveness_score": "0.0-10.0"
  }
}
```

**Implementation Example**:
```typescript
class FaceAnalysisService {
  private apiKey: string;
  private baseURL = 'https://ai-tools.rev21labs.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeFace(imageFile: File): Promise<FaceAnalysisResult> {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${this.baseURL}/vision/face-analysis`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Face analysis failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Compare two face analysis results for identity verification
  compareFaces(idPhoto: FaceAnalysisResult, selfie: FaceAnalysisResult): VerificationResult {
    const similarities = {
      faceShape: idPhoto.facial_features.face_shape === selfie.facial_features.face_shape,
      eyeColor: idPhoto.facial_features.eyes.color === selfie.facial_features.eyes.color,
      skinTone: idPhoto.skin_features.skin_tone.base_tone === selfie.skin_features.skin_tone.base_tone,
      // Add more comparison logic
    };

    const matchScore = Object.values(similarities).filter(Boolean).length / Object.keys(similarities).length;
    
    return {
      isMatch: matchScore > 0.7, // 70% similarity threshold
      confidence: matchScore,
      details: similarities
    };
  }
}
```

### 2. OCR Text Extraction API

**Endpoint**: `POST /vision/ocr`

**Purpose**: Extract text from government IDs, business permits, and certificates.

**Parameters**:
- `file` (required): Image file (PNG, JPEG, WEBP)

**Response Structure**:
```json
{
  "text": "Sample text extracted from the image"
}
```

**Implementation Example**:
```typescript
class OCRService {
  private apiKey: string;
  private baseURL = 'https://ai-tools.rev21labs.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async extractText(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${this.baseURL}/vision/ocr`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`OCR failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.text;
  }

  // Parse government ID information
  parseGovernmentID(extractedText: string): GovernmentIDInfo {
    // Implementation would depend on ID format
    // This is a simplified example
    const lines = extractedText.split('\n');
    
    return {
      fullName: this.extractName(lines),
      idNumber: this.extractIDNumber(lines),
      dateOfBirth: this.extractDateOfBirth(lines),
      address: this.extractAddress(lines)
    };
  }

  private extractName(lines: string[]): string {
    // Logic to extract name from text lines
    return lines.find(line => line.includes('NAME'))?.replace('NAME:', '').trim() || '';
  }

  private extractIDNumber(lines: string[]): string {
    // Logic to extract ID number
    return lines.find(line => /\d{4}-\d{4}-\d{4}/.test(line))?.match(/\d{4}-\d{4}-\d{4}/)?.[0] || '';
  }

  // Additional parsing methods...
}
```

### 3. Document Scanner API

**Endpoint**: `POST /vision/document-scan`

**Purpose**: Extract structured data from business documents and certificates.

**Parameters**:
- `file` (required): Image file (PNG, JPEG, WEBP)

**Response Structure**:
```json
{
  "text": "Sample json extracted from the image"
}
```

**Implementation Example**:
```typescript
class DocumentScannerService {
  private apiKey: string;
  private baseURL = 'https://ai-tools.rev21labs.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async scanDocument(imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${this.baseURL}/vision/document-scan`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Document scan failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    try {
      return JSON.parse(result.text);
    } catch {
      // If not JSON, return as text
      return { rawText: result.text };
    }
  }

  // Validate business permit
  async validateBusinessPermit(permitFile: File): Promise<BusinessPermitInfo> {
    const scannedData = await this.scanDocument(permitFile);
    
    return {
      businessName: scannedData.business_name || '',
      permitNumber: scannedData.permit_number || '',
      issueDate: scannedData.issue_date || '',
      expiryDate: scannedData.expiry_date || '',
      isValid: this.checkPermitValidity(scannedData)
    };
  }

  private checkPermitValidity(data: any): boolean {
    // Logic to validate permit data
    return !!(data.permit_number && data.business_name && data.issue_date);
  }
}
```

### 4. Sentiment Analysis API

**Endpoint**: `POST /ai/sentiment-analysis`

**Purpose**: Analyze client reviews and messages for trust scoring.

**Parameters**:
- `content` (required): Text content to analyze

**Response Structure**:
```json
{
  "content": "The sentiment analysis result"
}
```

**Implementation Example**:
```typescript
class SentimentAnalysisService {
  private apiKey: string;
  private baseURL = 'https://ai-tools.rev21labs.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeSentiment(content: string): Promise<SentimentResult> {
    const response = await fetch(`${this.baseURL}/ai/sentiment-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      throw new Error(`Sentiment analysis failed: ${response.statusText}`);
    }

    const result = await response.json();
    return this.parseSentimentResult(result.content);
  }

  private parseSentimentResult(content: string): SentimentResult {
    // Parse the sentiment analysis result
    const lines = content.split('\n');
    const sentiment = lines.find(line => line.includes('Sentiment:'))?.split(':')[1]?.trim() || 'neutral';
    const confidence = parseFloat(lines.find(line => line.includes('Confidence:'))?.split(':')[1]?.trim() || '0');
    
    return {
      sentiment: sentiment.toLowerCase() as 'positive' | 'negative' | 'neutral',
      confidence,
      rawResult: content
    };
  }

  // Calculate trust score contribution from sentiment
  calculateTrustScoreContribution(sentiments: SentimentResult[]): number {
    if (sentiments.length === 0) return 0;

    const positiveCount = sentiments.filter(s => s.sentiment === 'positive').length;
    const negativeCount = sentiments.filter(s => s.sentiment === 'negative').length;
    const neutralCount = sentiments.filter(s => s.sentiment === 'neutral').length;

    // Weight: positive = +2, neutral = 0, negative = -1
    const score = (positiveCount * 2) + (neutralCount * 0) + (negativeCount * -1);
    const maxPossibleScore = sentiments.length * 2;
    
    // Normalize to 0-100 scale
    return Math.max(0, (score / maxPossibleScore) * 100);
  }
}
```

### 5. Spam Detection API

**Endpoint**: `POST /ai/spam-detection`

**Purpose**: Filter fraudulent profiles and messages during registration.

**Parameters**:
- `sender` (required): Sender identifier
- `content` (required): Text content to check

**Response Structure**:
```json
{
  "content": "- Classification: SPAM\n- Confidence: High\n- Key indicators: ..."
}
```

**Implementation Example**:
```typescript
class SpamDetectionService {
  private apiKey: string;
  private baseURL = 'https://ai-tools.rev21labs.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async detectSpam(sender: string, content: string): Promise<SpamDetectionResult> {
    const response = await fetch(`${this.baseURL}/ai/spam-detection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      body: JSON.stringify({ sender, content })
    });

    if (!response.ok) {
      throw new Error(`Spam detection failed: ${response.statusText}`);
    }

    const result = await response.json();
    return this.parseSpamResult(result.content);
  }

  private parseSpamResult(content: string): SpamDetectionResult {
    const lines = content.split('\n');
    const classification = lines.find(line => line.includes('Classification:'))?.split(':')[1]?.trim() || 'UNKNOWN';
    const confidence = lines.find(line => line.includes('Confidence:'))?.split(':')[1]?.trim() || 'Low';
    const indicators = lines.find(line => line.includes('Key indicators:'))?.split(':')[1]?.trim() || '';

    return {
      isSpam: classification.toUpperCase() === 'SPAM',
      confidence: confidence.toLowerCase() as 'low' | 'medium' | 'high',
      indicators: indicators.split(',').map(i => i.trim()),
      rawResult: content
    };
  }

  // Validate user registration
  async validateUserRegistration(userData: UserRegistrationData): Promise<ValidationResult> {
    const checks = await Promise.all([
      this.detectSpam(userData.email, userData.companyDescription),
      this.detectSpam(userData.email, userData.personalBio),
      this.detectSpam(userData.email, userData.businessName)
    ]);

    const spamDetected = checks.some(check => check.isSpam);
    const highConfidenceSpam = checks.some(check => check.isSpam && check.confidence === 'high');

    return {
      isValid: !spamDetected,
      riskLevel: highConfidenceSpam ? 'high' : spamDetected ? 'medium' : 'low',
      flaggedFields: checks.map((check, index) => ({
        field: ['companyDescription', 'personalBio', 'businessName'][index],
        isSpam: check.isSpam,
        confidence: check.confidence
      })).filter(field => field.isSpam)
    };
  }
}
```

## Integration Architecture

### Trust Engine Service Structure
```
trust-engine/
├── src/
│   ├── services/
│   │   ├── FaceAnalysisService.ts
│   │   ├── OCRService.ts
│   │   ├── DocumentScannerService.ts
│   │   ├── SentimentAnalysisService.ts
│   │   └── SpamDetectionService.ts
│   ├── controllers/
│   │   ├── VerificationController.ts
│   │   └── TrustScoreController.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── VerificationResult.ts
│   │   └── TrustScore.ts
│   └── utils/
│       ├── AIServiceClient.ts
│       └── TrustScoreCalculator.ts
├── package.json
└── Dockerfile
```

### Environment Configuration
```env
# .env file
GW_API_KEY=your_byte_forward_api_key_here
AI_TOOLS_BASE_URL=https://ai-tools.rev21labs.com/api/v1
DATABASE_URL=postgresql://username:password@localhost:5432/lunoa
REDIS_URL=redis://localhost:6379
```

## Next Steps

1. **Set up Environment**: Configure API keys and environment variables
2. **Implement Services**: Create the TypeScript services using the examples above
3. **Create Controllers**: Build REST endpoints that use these services
4. **Add Database Models**: Store verification results and trust scores
5. **Build Frontend Components**: Create UI for file uploads and verification status
6. **Testing**: Write unit tests for each service
7. **Integration Testing**: Test the complete verification flow
