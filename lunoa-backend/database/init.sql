-- Lunoa Database Initialization Script
-- This script sets up the initial database structure for Lunoa backend

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create database user
CREATE USER IF NOT EXISTS lunoa_user WITH PASSWORD 'lunoa_password';
CREATE DATABASE IF NOT EXISTS lunoa_db OWNER lunoa_user;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE lunoa_db TO lunoa_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO lunoa_user;

-- Lunoa database structure will be managed by TypeORM migrations
-- This file serves as documentation for the database setup
