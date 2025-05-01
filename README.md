# Task Tracker API

## URL to API

https://task-tracker-be-klvr.onrender.com/api

## Overview

The Task Tracker API is a backend application built with Node.js, Express, and PostgreSQL. It provides a RESTful API for managing tasks, including creating, reading, updating, and deleting tasks. The API is designed to be used with a frontend application or as a standalone service. Complete with comprehensive error handling for invalid requests and includes a suite of tests using Jest and Supertest.

## Getting Started

### Clone the Repository

`git clone https://github.com/ZviHaffner/task-tracker-be.git`  
`cd task-tracker-be`

### Installing Dependencies

Ensure you have Node.js and npm installed, then run the following command to install the required dependencies:  
`npm install`

### Setup of Environment Variables

`.env.*` files have been set to be ignored by Git. Therefore, new `.env` files will have to be created to set up the environment variables required for the project to run.

Here are the steps to create and configure these files:

1.  Create a `.env.test` file in the root directory of the project with the following content:

PGDATABASE=<database_name>\_test

2.  Create a `.env.development` file in the root directory of the project with the following content:

PGDATABASE=<database_name>

### Seeding the Local Database

To set up and seed the local database, run:  
`npm run setup-dbs`  
`npm run seed`

### Starting the Server
To, start the server in development mode, run:  
`npm start`  
The server will run on http://localhost:9090 by default.

### Running Tests

To run the test suite, run:  
`npm test`

## API Endpoints

The API provides a comprehensive list of endpoints, which can be accessed at:

https://task-tracker-be-klvr.onrender.com/api

This documentation includes:

- A description of each endpoint.
- Information on available query parameters.
- The expected request format.
- Example responses for each endpoint.

Refer to this link for detailed information on how to interact with the API.