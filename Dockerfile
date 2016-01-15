# Dockerfile to create a docker image
FROM node
MAINTAINER Jechiy

# Add files to the image
RUN mkdir -p /opt/nodejs
ADD . /opt/nodejs
WORKDIR /opt/nodejs

# Install the dependencies modules
RUN npm install
# Expose the container port
EXPOSE 80

ENTRYPOINT ["node", "app.js"]
