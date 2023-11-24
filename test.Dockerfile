# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Make port available to the world outside this container
EXPOSE 3000

# Define environment variable file path
ENV NODE_ENV=development

# Run the app when the container launches
CMD ["node", "index.js"]
