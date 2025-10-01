# Base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Set environment variable to prevent memory issue
ENV NODE_OPTIONS=--max-old-space-size=4096

# Expose the port 
EXPOSE 5000

# Start server
CMD ["npm", "start"]
