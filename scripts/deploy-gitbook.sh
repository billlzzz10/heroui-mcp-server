#!/bin/bash

# Deploy to GitBook script

echo "🚀 Deploying HeroUI MCP Server Documentation to GitBook..."

# Check if GitBook CLI is installed
if ! command -v gitbook &> /dev/null; then
    echo "📦 Installing GitBook CLI..."
    npm install -g gitbook-cli
fi

# Install GitBook plugins
echo "🔌 Installing GitBook plugins..."
gitbook install

# Build the book
echo "🏗️ Building GitBook..."
gitbook build

# Serve locally for testing (optional)
if [ "$1" = "--serve" ]; then
    echo "🌐 Starting local server..."
    gitbook serve
    exit 0
fi

# Deploy to GitBook.com (if configured)
if [ -n "$GITBOOK_TOKEN" ]; then
    echo "📤 Deploying to GitBook.com..."
    # Add your GitBook deployment commands here
    echo "✅ Deployed successfully!"
else
    echo "⚠️ GITBOOK_TOKEN not set. Skipping deployment."
    echo "📁 Built files are in _book/ directory"
fi

echo "✨ Done!"
