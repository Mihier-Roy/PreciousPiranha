# Install dependencies
install-js-deps:
    @echo "Installing deps for node server\n"
    cd {{ justfile_directory() }}/backend; npm install --no-fund --ignore-scripts;
    @echo "Node dependencies installed!"
    @echo "\nNow Installing deps for react application\n"
    cd {{ justfile_directory() }}/frontend; npm install --no-fund --ignore-scripts;
    @echo "React dependencies installed!"

# Run node backend with nodemon (Requires its own terminal)
run-js-server:
    @echo "\nLaunching node(express.js) server in dev mode (running with nodemon)"
    cd {{ justfile_directory() }}/backend; npm run server;

# Run react front-end with hot reload (Requires it's own terminal)
run-js-frontend:
    @echo "Launching react application with hot-reload\n"
    cd {{ justfile_directory() }}/frontend; npm start;

# Launch js app in development mode using 'concurrently' and seed database
run-js-dev: mongodb-seed-data
	@echo "Launching backend and frontend using concurrently"
	cd backend; npm run dev;

# Seed sample data into database
mongodb-seed-data:
    @echo "Inserting sample data into mongo database"
    cd backend; node sample-data/seeder.js;

# Start local mongodb container on port 27017
mongodb-start-container:
    @echo "Launching docker container and listening on port 27017"
    docker image pull mongo:5.0.7-focal
    docker container run --rm -d -p 27017:27017 --name piranha-mongo mongo:5.0.7-focal
    docker container ls -a

# Stop local mongodb container
mongodb-stop-container:
    @echo "Stoping mongodb container"
    docker container stop piranha-mongo
    @echo "Stopped mongodb container"

# Clear all data on database
mongodb-delete-data:
    @echo "Removing all data from mongo database"
    cd backend; node sample-data/seeder.js -d;
