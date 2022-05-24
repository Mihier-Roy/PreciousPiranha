# Build production images of the JS app
build-prod:
    docker-compose -f docker-compose.yml build --no-cache --force-rm
    @echo "\n\nSuccessfully built docker images: piranha-client, piranha-server, piranha-mongo."

# Launch production version of the application
run-prod:
    @echo "Spinning up production application in detached mode."
    docker-compose -f docker-compose.yml up -d
    @echo "The application is now available at http://localhost:8080/"

stop-prod:
    @echo "Exiting application."
    docker-compose down --remove-orphans
