# Lunoa API Documentation

## Overview
Lunoa is an AI-powered B2B Trust & Marketplace Platform that integrates Byte Forward AI Services for comprehensive business functionality including trust scoring, project matching, document processing, and advanced AI capabilities.

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All endpoints (except authentication) require JWT Bearer token authentication.

### Login Endpoint
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## API Endpoints

### Authentication
- `POST /auth/login` - User authentication with email/password

### User Management
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `DELETE /users/:id` - Delete user

### AI Services (Byte Forward Integration)

#### Trust & Marketplace
- `POST /ai/trust-score` - Calculate AI-powered trust score
- `POST /ai/project-match` - Find AI-powered project matches

#### Document Processing
- `POST /ai/ocr-extract` - Extract text from images using OCR
- `POST /ai/upload-pdf` - Upload and process PDF documents
- `POST /ai/face-analysis` - Analyze faces in uploaded images

#### Text Processing
- `POST /ai/text-moderation` - Moderate text content
- `POST /ai/text-summarizer` - Summarize text content
- `POST /ai/text-generation` - Generate text content
- `POST /ai/translation` - Translate text content
- `POST /ai/spam-detection` - Detect spam content
- `POST /ai/sentiment-analysis` - Analyze sentiment

#### Audio Processing
- `POST /ai/speech-to-text` - Convert speech to text from audio files

#### Chat Services
- `GET /ai/chat/session` - Create new chat session
- `POST /ai/chat/message` - Send message in chat session

## Environment Variables

Required for AI services:
```bash
BYTE_FORWARD_API_KEY=your_api_key_here
BYTE_FORWARD_BASE_URL=https://ai-tools.rev21labs.com/api/v1
```

## Request Examples

### Trust Score Calculation
```http
POST /ai/trust-score
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "userId": "user123",
  "transactionHistory": [
    {
      "amount": 1000,
      "date": "2024-01-15",
      "type": "completed"
    }
  ],
  "userProfile": {
    "company": "Tech Corp",
    "verified": true,
    "rating": 4.8
  }
}
```

### OCR Text Extraction
```http
POST /ai/ocr-extract
Content-Type: multipart/form-data
Authorization: Bearer your_jwt_token

file: [binary image data]
```

### Project Matching
```http
POST /ai/project-match
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "projectDescription": "Build a mobile app for inventory management",
  "requiredSkills": ["React Native", "Node.js", "MongoDB"]
}
```

## Response Examples

### Successful Trust Score Response
```json
{
  "score": 85.5,
  "confidence": 0.92,
  "factors": [
    "High transaction completion rate",
    "Verified company profile",
    "Strong user ratings"
  ]
}
```

### Successful OCR Response
```json
{
  "text": "Invoice #12345\nAmount: $1,234.56\nDue Date: 2024-02-15",
  "confidence": 0.95,
  "language": "en"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Invalid or missing authentication
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting
API requests are subject to rate limiting based on Byte Forward AI service quotas.

## Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting

## Testing
Run comprehensive tests:
```bash
npm test
npm run test:e2e
```

## Documentation Access
Interactive API documentation is available at:
```
http://localhost:3000/api-docs
```

## Support
For technical support or questions about the API, please refer to the Byte Forward AI documentation or contact the development team.
