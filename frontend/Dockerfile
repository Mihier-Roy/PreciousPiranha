# This file uses multi-stage builds to generate a minimal deployment config
# Stage 1: Build the react application and make the resulting files available to the next stage
FROM node:18.2.0 AS build

# Set working directory
WORKDIR /app
# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev
# Build the application
COPY . ./
RUN npm run build

# Stage 2: Create a new slim nginx image to serve the app
FROM nginx:1.21.6-alpine

# Copy the build/ folder from the previous stage
COPY --from=build /app/build /usr/share/nginx/html
# Copy the nginx config file
COPY ../infra/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Listen on port 80 and serve the application
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
