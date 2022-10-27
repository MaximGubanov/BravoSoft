FROM node:16
# nginx:1.19-alpine

# COPY ./build /var/www
# COPY ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /usr/src/front
WORKDIR /usr/src/front
COPY . /usr/src/front/
RUN npm install

EXPOSE 3000
CMD ["npm","start"]