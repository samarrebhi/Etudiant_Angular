# Stage 1: Build Angular app
FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve Angular app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/etudiant-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
