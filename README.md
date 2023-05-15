# Run the project

1. Build images and run containers
docker compose up -d 
or 
docker-compose up -d

It will run app, app database and app test database containers. You will be able to send requests to http://localhost:3000/${routs}. Currently, there isn't the Swagger documentation which would describe the routs, but that can figure up from code. Some routes are protected and can be used by logged in user. You my use dummy users (after step 4.) from src/dummy/users.ts with password "test123" or create some new.

2. To enter into server bash: "docker exec -it nodejs-nestjs-example-api-app-1 sh" (check container name with "docker ps")

3. Change directory: "cd src/database"

Database tables will be created programmatically (in step 1) it is not necessary
to have migrations

4. To fill database tables with data, in shell run seeders: "npx sequelize-cli db:seed:all"
