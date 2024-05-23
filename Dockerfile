FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 8080
ENV MODEL_URL=https://storage.googleapis.com/submission-mlgc-andissetiawan/submissions-model/model.json
EXPOSE 8080
CMD [ "npm",  "start"]
