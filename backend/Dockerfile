# Use Node 20 on Alpine Linux (small and fast)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (caching trick)
COPY package*.json ./

# Install ALL dependencies (including devDependencies, because we need
# TypeScript to compile the code)
RUN npm install

# Now copy the rest of the source code
COPY . .

# Compile TypeScript -> dist/
RUN npm run build

# Document the port the app listens on
EXPOSE 8555

# Run the compiled JavaScript
CMD ["node", "dist/server.mjs"]