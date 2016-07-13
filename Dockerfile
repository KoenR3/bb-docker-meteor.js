FROM bigboards/base-x86_64

MAINTAINER Koen Rutten <koen.rutten@vectr.consulting>

ENV APP_NAME HALTest

RUN apt-get update \
  && apt-get install -y curl

# Install meteor.js
RUN curl https://install.meteor.com/ | /bin/sh \
  && apt-get install -y npm

# Add a meteor app directory
ADD /D3Test /opt/$APP_NAME

# Set working directory
WORKDIR /opt/$APP_NAME/

# Install node packet manager
RUN npm install \
  && rm -rf /var/lib/apt/lists/*



# Set environment variables

ENV PORT 80
ENV ROOT_URL http://127.0.0.1
ENV MONGO_URL mongodb://mongo_instance:27017/$APP_NAME

EXPOSE 80

CMD meteor
