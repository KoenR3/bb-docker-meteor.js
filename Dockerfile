FROM bigboards/base-x86_64

MAINTAINER Koen Rutten <koen.rutten@vectr.consulting>

# Set environment variables
ENV APP_NAME HALTest
ENV MONGO_USER admin
ENV MONGO_PASS vectrtest
ENV PORT 3000
ENV ROOT_URL http://127.0.0.1
#ENV MONGO_URL mongodb://$MONGO_USER:$MONGO_PASS@mongodb:27017/$APP_NAME
ENV MONGO_URL mongodb://mongodb:27017/$APP_NAME

RUN apt-get update \
  && apt-get install -y curl

# Install meteor.js
RUN curl https://install.meteor.com/ | /bin/sh \
  && apt-get install -y npm

# Add a meteor app directory
COPY /D3Test /opt/$APP_NAME

# Set working directory
WORKDIR /opt/$APP_NAME/

# Install node packet manager
RUN npm install \
  && rm -rf /var/lib/apt/lists/*


EXPOSE 3000

CMD meteor
