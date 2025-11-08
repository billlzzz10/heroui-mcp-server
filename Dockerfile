# HeroUI MCP Server Dockerfile

# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install system dependencies for canvas and sharp
RUN apk add --no-cache \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    python3 \
    make \
    g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps && npm cache clean --force

# Development stage
FROM base AS development

# Install all dependencies including dev dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build

# Install all dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install system dependencies for runtime
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    musl \
    giflib \
    pixman \
    pangomm \
    libjpeg-turbo \
    freetype

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
COPY --from=build --chown=heroui:nodejs /app/docs ./docs

# Create necessary directories
RUN mkdir -p data/cache data/objects data/templates logs && \
    chown -R heroui:nodejs data logs

# Switch to non-root user
USER heroui

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node dist/scripts/health-check.js

# Start the application
CMD ["node", "dist/server/index.js"]

# Multi-stage build for different environments
FROM production AS production-slim

# Remove unnecessary files for minimal image
RUN rm -rf docs

# Labels for metadata
LABEL maintainer="HeroUI Team <team@heroui.dev>"
LABEL version="1.0.0"
LABEL description="HeroUI MCP Server - A Model Context Protocol server for UI components"
LABEL org.opencontainers.image.source="https://github.com/heroui/mcp-server"
LABEL org.opencontainers.image.documentation="https://docs.heroui.dev"
LABEL org.opencontainers.image.licenses="ISC"
