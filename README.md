<h1 align="center">Quick Start Template for Developing APIs and Backends in Node.js with Express and TypeScript</h1>

<p>This template provides a solid foundation for rapidly developing APIs and backends in Node.js using Express and TypeScript. It includes pre-configured settings for MongoDB with Mongoose, JWT authentication, logging with Morgan, and HTTP requests with Axios.</p>

Ideal for kickstarting projects from scratch without spending time on initial setup. Comes with ESLint and Prettier for code styling.

## Prerequisites

- [Node.js](https://nodejs.org/): ^12.0.0
- [NPM](https://npmjs.org/) or any other Node.js package manager

## Features:

- Express server with TypeScript
- MongoDB connection with Mongoose
- Authentication with JSON Web Tokens
- Request logging with Morgan
- Error handling and status codes
- Environment variable configuration
- Healthcheck endpoint
- HTTP requests with Axios
- Organized folder structure
- Linting with ESLint and Prettier
- Debugging with Debug
- Contribution guide and templates
- Incorporates best practices out-of-the-box for quickly and professionally launching Node.js projects with TypeScript.

## Installation

Install packages with your preferred package manager, e.g. npm:

```
npm install
```

If you want to have the API running on a different port, into `.env` and change the `PORT` field to your preferred port. \
Depending on if you want to install the API for production or for development, the process is different.

### Production

Build the project using the following command:

```
npm run build
```

Then start the server with this command:

```
npm start
```

### Development

Start the dev server with this command:

```
npm run dev
```

### Configuration via Environment variable

| environment variable | default     | description                                                             |
| -------------------- | ----------- | ----------------------------------------------------------------------- |
| MONGODB_URI          | `undefined` | Add your connection string of MongoDB into your application code.       |
| PORT                 | 3000        | The TCP port the starter template will use for incoming network connections. |
| TOKEN_SECRET         | secretWord  | The secret word of your JWT connections.                                |

Made with love by [AbigailSC](https://github.com/AbigailSC) 🚀