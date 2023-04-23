FROM node:18.16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code to work directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start app with npm start command
CMD ["npm", "start"]