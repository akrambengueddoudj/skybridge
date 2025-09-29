FROM node:20

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the project (without node_modules)
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
