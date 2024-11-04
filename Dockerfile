
# Use the official Node.js image as a base
FROM node:18.18.2

# Set the working directory in the container
WORKDIR /.

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN prisma generate

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your app runs on
EXPOSE 6200

# Command to run your application
CMD ["npm", "start"]
