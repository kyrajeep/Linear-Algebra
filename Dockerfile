# Development Dockerfile for Linear Algebra App
# Uses node:24-alpine as base (lightweight, ~170MB vs ~1GB for full Node)

FROM node:24-alpine

# Install build essentials (needed for some npm packages that compile native code)
RUN apk add --no-cache python3 make g++ bash

# Set working directory inside container
WORKDIR /app

# Copy package files (separate layer for better caching)
COPY package.json package-lock.json* ./

# Install dependencies (npm install will run inside container)
RUN npm install

# Copy the entire project
COPY . .

# Expose Vite dev server port
EXPOSE 3000

# Default command: start dev server
# Can be overridden, e.g., `docker run ... npm run build` or `docker run ... npm test`
CMD ["npm", "run", "dev"]
