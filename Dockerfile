FROM bigboards/base-__arch__

MAINTAINER Koen Rutten <koen.rutten@vectr.consulting>

ENV APP_NAME HALTest

RUN apt-get update \
  && apt-get install -y curl

# Install meteor.js
RUN curl https://install.meteor.com/ | /bin/sh

# Add a meteor app directory
ADD . /opt/$APP_NAME/app

# Set working directory
WORKDIR /opt/$APP_NAME/app/programs/server

# Install node packet manager
RUN npm install

# Set environment variables
WORKDIR  /opt/$APP_NAME/app
ENV PORT 80
ENV ROOT_URL http://127.0.0.1
ENV MONGO_URL mongodb://mongo_instance:27017/$APP_NAME

EXPOSE 80

CMD node ./main.js
