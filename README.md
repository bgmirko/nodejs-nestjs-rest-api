# Run the project

1. Build images and run containers:

"docker compose up -d" 
or 
"docker-compose up -d"

2. Enter to docker container with Shell: 

"docker exec -it nodejs-nestjs-example-api-app-1 sh"

(check container name with "docker ps")

3. Change directory inside container: 

"cd src/database"

4. Populate database with dummy data from seeders:

"npx sequelize-cli db:seed:all"

Database tables were created programmatically (step 1), it is not necessary
to have migrations

# Swagger API documentation

http://localhost:3000/api/

Few routes are protected with Bearer Token. Use login route to gain that token.

To login:
- Use user with username: petar80 and password: test123 
- Use any user from src/database/seeders/*-create-dummy-users.ts file 
- Create new user.
