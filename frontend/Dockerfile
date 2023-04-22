FROM node:18
WORKDIR /home/app/frontend
COPY ["package.json","package-lock.json*","./"]
RUN npm install
EXPOSE 3000
CMD npm start