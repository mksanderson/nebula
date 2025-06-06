FROM node:20-alpine as build
WORKDIR /app
COPY package.json tsconfig.json angular.json tailwind.config.js ./
COPY src ./src
RUN npm install && npx tailwindcss -i ./src/styles.scss -o ./src/styles.css && npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/nebula /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
