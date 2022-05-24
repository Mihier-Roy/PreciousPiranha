# PreciousPiranha

A simple eCommerce application to play around with programming web applications using different technologies. Heavily inspired by [Brad Traversy's Pro Shop MERN](https://github.com/bradtraversy/proshop_mern) application.

## Targeted implementations

### Backend

-   [x] Node.js (Express.js)
-   [ ] Golang
    -   [ ] net/http
    -   [ ] go-chi
-   [ ] Rust
    -   [ ] Auxum
    -   [ ] Rocket
    -   [ ] Acticx Web
-   [ ] Java (Spring)
-   [ ] Deno
-   [ ] Python
    -   [ ] Flask
    -   [ ] FastAPI

### Front-end

-   [x] React
    -   [ ] React with TS
-   [ ] Blazor
-   [ ] Rust/Golang with WASM

## Getting started with Development

### TL;DR;

```bash
git clone https://github.com/Mihier-Roy/PreciousPiranha.git
cd PreciousPiranha

# Create an environment file for the backend.
cd backend
cat >> .env<< EOF
MONGO_URI = <your-mongo-connection-string-here>
JWT_SECRET=<your-secret-key-here>
PAYPAL_CLIENTID=
PORT=5000
NODE_ENV=development
EOF

# Build the container images. This installs dependencies and builds a production version of the react app.
just build-prod
# OR
# docker-compose -f docker-compose.yml build --no-cache --force-rm

# Run the application
# Front-end is accessible via :8080. Backend and DB are not exposed to the host.
just run-prod
# OR
# docker-compose -f docker-compose.yml up -d

# Clean up containers
just stop-prod
# OR
# docker-compose down --remove-orphans
```

### Install dependencies

The project uses the **[Just](https://github.com/casey/just)** command runner to perform different tasks. We use this because it's a lot easier to manage commands across languages and technologies from `just` recipies rather than remembering what to run each time.

It can be installed using cargo. If you don't have `cargo` installed, full installation instructions can be found [here](https://github.com/casey/just#installation).

```bash
# Install just
cargo install just
```

### Environment variables

The server side requires an environment file which looks like the following:

```env
MONGO_URI = <your-mongo-connection-string-here>
# If using mongodb in a docker container, use the following connection string
# mongodb://localhost:27017/piranha?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
JWT_SECRET=<your-secret-key-here>
PAYPAL_CLIENTID=
PORT=5000
NODE_ENV=development
```

### Docker compose

The project uses [Docker compose](https://docs.docker.com/compose/) to serve production and development versions of the application. This allows for standardised environemnts for development and makes it easy to get started with developing the application.

There are two docker compose files:

-   `docker-compose.yml' for a production deployment.
    -   This version compiles a production version of the react app using `npm run build` and serves it using `nginx`.
    -   `nginx` is also configured to act as a reverse proxy for the backend and passes all requests to `/api` to the backend container.
-   `docker-compose.dev.yml` used for development.
    -   This version is used for development and sets up a development environment which supports hot reloads for the client and the server.
    -   Each service will have a port exposed to localhost which can be used to interact with the services directly.
    -   Client: `3000`, Server: `5000`, MongoDB: `27017`

## Credits

All product images are taken from [D&D Beyond](https://www.dndbeyond.com/magic-items).
