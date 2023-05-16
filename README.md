# Run the project

1. Build images and run containers
docker compose up -d 
or 
docker-compose up -d

2. To enter into server bash: "docker exec -it nodejs-nestjs-example-api-app-1 sh" (check container name with "docker ps")

3. Change directory: "cd src/database"

Database tables will be created programmatically (in step 1) it is not necessary
to have migrations

4. To fill database tables with data, in shell run seeders: "npx sequelize-cli db:seed:all"

# Swagger api documentation

http://localhost:3000/api/

Some routes are protected. You may use login route to login user with username and password (from src/database/seeders/*-create-dummy-users.ts) and use token from response in other protected routes like Header Bearer Token
