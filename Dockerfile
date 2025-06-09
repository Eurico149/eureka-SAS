FROM node:22.14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=80
RUN npm run build
CMD ["node", "dist/server.js"]
