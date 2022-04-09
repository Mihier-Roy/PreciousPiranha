# Install dependencies
install-js-deps:
	@echo "Installing deps for node server\n"
	cd {{justfile_directory()}}/backend; npm install;
	@echo "Node dependencies installed!"
	@echo "\nNow Installing deps for react application\n"
	cd {{justfile_directory()}}/frontend; npm install
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
	