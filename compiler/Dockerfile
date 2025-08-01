FROM node:20

RUN apt-get update && apt-get install -y \
    g++ \
    openjdk-17-jdk \
    python3 \
    python3-pip

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]
