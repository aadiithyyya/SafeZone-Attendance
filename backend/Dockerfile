# Use an official Node.js image as the base
FROM mcr.microsoft.com/playwright:v1.35.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (Render uses PORT environment variable)
EXPOSE 5001

# Command to run your backend
CMD ["npm", "start"]
