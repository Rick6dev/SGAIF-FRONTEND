FROM docker.io/nginx
LABEL maintainer="juan.marquez@credicard.com.ve"
ADD ./Target/default.conf /etc/nginx/conf.d
ADD ./Target/nginx.conf /etc/nginx
ADD ./Target/nginx/lcsdevapptdmaster.credicard.com.ve.key /etc/nginx/conf.d
ADD ./Target/nginx/blundle.pem /etc/nginx/conf.d
COPY ./dist/* /usr/share/nginx/html