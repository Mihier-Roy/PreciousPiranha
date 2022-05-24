# Build production images of the JS app
build-prod:
    docker-compose -f docker-compose.yml build --no-cache --force-rm
    @echo "\n\nSuccessfully built docker images: piranha-client, piranha-server, piranha-mongo."

# Launch production version of the application
run-prod:
    @echo "Spinning up production application in detached mode."
    docker-compose -f docker-compose.yml up -d
    @echo "The application is now available at http://localhost:8080/"

# Stop containers
stop:
    @echo "Exiting application."
    docker-compose down --remove-orphans

# Build development images of the JS app
build-dev:
    docker-compose -f docker-compose.dev.yml build --no-cache --force-rm
    @echo "\n\nSuccessfully built docker images: piranha-client, piranha-server, piranha-mongo."

# Launch development version of the application
run-dev:
    @echo "Spinning up development application."
    docker-compose -f docker-compose.dev.yml up --build
    @echo "Client: http://localhost:3000/, API: http://localhost:5000/, DB: http://localhost:27017/"