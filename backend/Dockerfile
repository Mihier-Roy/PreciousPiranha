# Use a minimal base image
FROM node:18.2.0-alpine3.15

USER node
WORKDIR /app

# Copy dependency information and install all dependencies
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source code (and all other relevant files)
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Expose the application on port 5000
EXPOSE 5000
CMD [ "node", "dist/server.js" ]
