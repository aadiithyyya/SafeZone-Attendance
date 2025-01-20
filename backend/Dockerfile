# Use Playwright's pre-built image with all dependencies
FROM mcr.microsoft.com/playwright:v1.35.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Render uses (default: 5001)
EXPOSE 5001

# Start the server
CMD ["node", "app.js"]
