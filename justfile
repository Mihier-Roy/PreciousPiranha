# Install dependencies
js-install-deps:
    @echo "Installing deps for node server\n"
    cd {{ justfile_directory() }}/backend; npm install --no-fund --ignore-scripts;
    @echo "Node dependencies installed!"
    @echo "\nNow Installing deps for react application\n"
    cd {{ justfile_directory() }}/frontend; npm install --no-fund --ignore-scripts;
    @echo "React dependencies installed!"

# Run node backend with nodemon (Requires its own terminal)
js-run-server:
    @echo "\nLaunching node(express.js) server in dev mode (running with nodemon)"
    cd {{ justfile_directory() }}/backend; npm run server;

# Run react front-end with hot reload (Requires it's own terminal)
js-run-frontend:
    @echo "Launching react application with hot-reload\n"
    cd {{ justfile_directory() }}/frontend; npm start;

# Launch js app in development mode using 'concurrently' and seed database
js-run-dev: db-seed-data
	@echo "Launching backend and frontend using concurrently"
	cd backend; npm run dev;

# Build frontend production image
js-build-frontend:
    @echo "Building production image of React frontend"
    cd frontend; docker build --rm -t piranha-frontend:0.1 .;

# Seed sample data into database
db-seed-data:
    @echo "Inserting sample data into mongo database"
    cd backend; node sample-data/seeder.js;

# Start local mongodb container on port 27017
db-start-container:
    @echo "Launching docker container and listening on port 27017"
    docker image pull mongo:5.0.7-focal
    docker container run --rm -d -p 127.0.0.1:27017:27017 --name piranha-mongo mongo:5.0.7-focal
    docker container ls -a

# Stop local mongodb container
db-stop-container:
    @echo "Stoping mongodb container"
    docker container stop piranha-mongo
    @echo "Stopped mongodb container"

# Clear all data on database
db-delete-data:
    @echo "Removing all data from mongo database"
    cd backend; node sample-data/seeder.js -d;
