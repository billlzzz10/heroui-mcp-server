# HeroUI MCP Server Dockerfile

# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps && npm cache clean --force

# Development stage
FROM base AS development

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start development server
CMD ["node", "dist/server/index.js"]

# Build stage
FROM base AS build

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S heroui -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production --legacy-peer-deps && npm cache clean --force

# Copy built application from build stage
COPY --from=build --chown=heroui:nodejs /app/dist ./dist
COPY --from=build --chown=heroui:nodejs /app/package.json ./package.json

# Create necessary directories
RUN mkdir -p data/cache data/objects data/templates logs && \
    chown -R heroui:nodejs data logs

# Switch to non-root user
USER heroui

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server/index.js"]
