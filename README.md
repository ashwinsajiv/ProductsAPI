## Introduction

ProductsAPI is a simple project that exposes 11 endpoints that can be use to get, create and update products and their options.

## Requirements

In order to run this application locally, you will need the following install:

1. NodeJS
2. MongoDB

To avoid installing mongo exclusively, make use of the docker setup explained below.

## Installation

Though this app is production ready, there is no benefit for now in running the app in `prod` mode. Set the `MODE` environment variable to either `local` or `docker`.

### Production

To run the application in production mode, you will need to setup a cluster and database in remote mongodb and get the connecting url (format specified below). Set the following environment variables:
`MODE=prod`
`MONGO_URI_PROD=mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]`

### Local

To run the application locally, install mongo in your local machine and set the following environment variables:
`MODE=local`
`MONGO_URI_LOCAL=mongodb://localhost:27017/test`
Run `npm install` and `npm run server` to start the server on http://localhost/3000.

### Docker

To run the application in a container, install docker. Once docker is installed, run `docker-compose up` from the root of the project to start the server on http://localhost. The environment variables are already set in the docker specifications.

##### Note: The seeder script needs to be ran once at the start when testing locally. For docker, the seeder script runs at the start of running a container.

## Testing

The test folder contains all the API tests. We make use of Chai (an assertion library) and Mocha (a testing framework) for our tests. Since our motive is to test the correctness of the endpoints, we run the seeder script at the start and end of each tests to make sure that data being tested is consistent. To start testing, run `npm run test`.

## Documentation

To ease up and make documentation prettier, two node libraries have been used. They are `swagger-jsdoc` and `swagger-ui-express`. Using these, documentation of APIs in openAPI format can be generated from comments. Check `./controllers/*.js` for comments holding information about each of the endpoint, which is stripped and documented at `http://localhost/docs` or `http://localhost:3000/docs`.

## Postman

Checkout `./postman/postman_collections` for all the postman requests involving all the endpoints.
