# Use Node 20 on Alpine Linux
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files first (caching trick)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Vite default port
EXPOSE 5173

# Run Vite's dev server, bound to all interfaces so it's reachable
# from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]