FROM node:18
WORKDIR /home/app/backend
COPY ["package.json","package-lock.json*",".env","./"]
RUN npm install
EXPOSE 8000
CMD npm start