FROM node:lts as base

WORKDIR /app

# inject all environment vars we'll need
ARG VITE_PORT
# expose the variable to the finished cotainer
ENV VITE_PORT=$VITE_PORT

#COPY . ./
#COPY package.json ./
#RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean
RUN rm -rf node_modules
#RUN yarn install
#RUN yarn cache clean
RUN yarn install --frozen-lockfile && yarn cache clean


#COPY . ./
EXPOSE 3000 5173
#CMD ["ls"]
CMD ["npm", "run", "dev"]

FROM base as prod-builder
RUN npm run build

# it's a good idea to pin this, but for demo purposes we'll leave it as is
FROM nginx:latest as prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]