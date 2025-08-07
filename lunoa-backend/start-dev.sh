#!/bin/bash

# Lunoa Backend Development Startup Script
# This script sets up the development environment

echo "🚀 Starting Lunoa Backend Development Environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your actual configuration values"
fi

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker detected. Starting services..."
    
    # Start PostgreSQL and Redis
    echo "📦 Starting PostgreSQL and Redis..."
    docker-compose up -d postgres redis
    
    # Wait for services to be ready
    echo "⏳ Waiting for services to be ready..."
    sleep 10
    
    # Check if services are running
    if docker-compose ps | grep -q "postgres.*Up"; then
        echo "✅ PostgreSQL is running"
    else
        echo "❌ PostgreSQL failed to start"
        exit 1
    fi
    
    if docker-compose ps | grep -q "redis.*Up"; then
        echo "✅ Redis is running"
    else
        echo "❌ Redis failed to start"
        exit 1
    fi
else
    echo "⚠️  Docker not found. Please ensure PostgreSQL and Redis are running manually"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if build succeeds
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check the errors above"
    exit 1
fi

# Start development server
echo "🚀 Starting development server..."
npm run start:dev
