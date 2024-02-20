FROM nginx:1.17
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx-conf/front-app.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html