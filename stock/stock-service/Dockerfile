# 1. Use Node.js base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# 4. Copy source code
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096

# 5. Expose service port
EXPOSE 5003

# 6. Run the service
CMD ["node", "app.js"]
