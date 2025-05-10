FROM nginx:1.23.3-alpine


RUN rm -rf /usr/share/nginx/html/*
# # # Copy built frontend files
COPY ./Frontend/dist /usr/share/nginx/html

# Copy custom config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
