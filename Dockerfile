# To run this:
# sudo docker build -t ui .
# sudo docker run -p 3000:3000 -it -d ui
# http://localhost:3000

# to stop it from running:
# sudo docker stop <pid> 
# the pid is printed to the screen and you only need the first few characters

FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
# run the next line for production 
# RUN npm ci --only=production

COPY . .

# show a port 
EXPOSE 3000
CMD ["npm", "start"]

