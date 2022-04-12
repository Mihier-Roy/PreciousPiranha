# PreciousPiranha
A simple eCommerce application to play around with programming web applications using different technologies. Heavily inspired by [Brad Traversy's Pro Shop MERN](https://github.com/bradtraversy/proshop_mern) application.

## Targeted implementations
### Backend
- [x] Node.js (Express.js)
- [ ] Golang
	- [ ] net/http
	- [ ] go-chi
- [ ] Rust
	- [ ] warp
	- [ ] tokio
	- [ ] auxm
- [ ] Java (Spring)
- [ ] Deno

### Front-end
- [x] React
	- [ ] React with TS
- [ ] Blazor
- [ ] Rust/Golang with WASM

## Getting started with Development
### Install dependencies
The project uses the **[Just](https://github.com/casey/just)** command runner to perform different tasks. We use this because it's a lot easier to manage commands across languages and technologies from `just` recipies rather than remembering what to run each time.

It can be installed using cargo. If you don't have `cargo` installed, full installation instructions can be found [here](https://github.com/casey/just#installation).
```bash
# Install just
cargo install just
```

### Database
The application uses MongoDB as it's persistence layer. You can run your own using Docker or use MongoDB Atlas. To run your own Docker container, use the following command:
```bash
docker image pull mongo:5.0.7-focal
docker container run -d -p 27017:27017 --name piranha-mongo mongo:5.0.7-focal
```

### Environment variables
The server side requires an environment file which looks like the following:
```env
MONGO_URI = <your-mongo-connection-string-here>
# If using mongodb in a docker container, use the following connection string
# mongodb://localhost:27017/piranha?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
JWT_SECRET = <your-secret-key-here>
PAYPAL_CLIENTID =
PORT = 5000
NODE_ENV = development
```

### Clone repository and run application

```bash
git clone https://github.com/Mihier-Roy/PreciousPiranha.git
cd PreciousPiranha

# Install dependencies for backend and frontend
just install-js-deps

# Run JavaScript version of the application
# Backend on :5000, frontend on :3000
just run-js-dev
```

## Credits
All product images are taken from [D&D Beyond](https://www.dndbeyond.com/magic-items).