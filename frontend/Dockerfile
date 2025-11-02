# Frontend Dockerfile
FROM node:20

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

# Build the React app for production
RUN npm run build

# Serve the built app using a simple static server
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]