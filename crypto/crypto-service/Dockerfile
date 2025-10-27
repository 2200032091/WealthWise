# 1. Use Node.js base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and install deps
COPY package*.json ./
RUN npm install --only=production

# 4. Copy the rest of the code
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096

# 5. Expose port
EXPOSE 5002

# 6. Run the app
CMD ["node", "index.js"]
