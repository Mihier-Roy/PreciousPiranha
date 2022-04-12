# Install dependencies
install-js-deps:
	@echo "Installing deps for node server\n"
	cd {{justfile_directory()}}/backend; npm install --no-fund --ignore-scripts;
	@echo "Node dependencies installed!"
	@echo "\nNow Installing deps for react application\n"
	cd {{justfile_directory()}}/frontend; npm install --no-fund --ignore-scripts;
	@echo "React dependencies installed!"

# Run node backend in dev mode
run-js-backend:
	@echo "Launching node(express.js) server in dev mode (running with nodemon)\n"
	cd {{justfile_directory()}}/backend; npm run dev;

# Run react front-end
run-js-frontend:
	@echo "Launching react application with hot-reload\n"
	cd {{justfile_directory()}}/frontend; npm start;

# Launch js version of the application
run-js:	run-js-backend run-js-frontend

# Seed sample data into database
mongodb-seed-data:
	@echo "Inserting sample data into mongo database"
	cd backend; node sample-data/seeder.js;

# Clear all data on database
mongodb-delete-data:
	@echo "Removing all data from mongo database"
	cd backend; node sample-data/seeder.js -d;
	