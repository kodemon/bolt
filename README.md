# Bolt

A small experimental second layer read index of a blockchain using event sourced architecture.

## Prerequisites

You need to have `docker` and `node.js` installed to be able to run this repository.

## Setup

Run the following commands to set things up:

```sh
$ docker-compose up -d
$ npm install
```

## Start

Once docker is running the mongo container and dependencies are installed, we can run the app with the following command:

```sh
$ npm start
```

## Known Performance Issues

 1. When performing an initial get request response time of ~600ms is seen, subsequent requests are ~30ms.
    a. After waiting for a few seconds ~600ms is seen again for the first query.
    b. This is most likely a server connection setup issue.
