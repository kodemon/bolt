# Bolt

A small experimental second layer read index of a blockchain using event sourced architecture.

## Prerequisites

You need to have `docker` and `node.js` installed to be able to run this repository.

## Setup

Run the following commands to set things up:

```sh
$ docker-compose up -d
$ npm intall
```

## Start

Once docker is running the mongo container and dependencies are installed, we can run the app with the following command:

```sh
$ npm start
```

## TODO

 - [] Block invalidation and stream rehydration.
