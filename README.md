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

 - When performing an initial get request response time of ~600ms is seen, subsequent requests are ~30ms.
   - After waiting for a few seconds ~600ms is seen again for the first query.
   - This is most likely a server connection setup issue.

## Performance Results

![bolt_performance](https://user-images.githubusercontent.com/1998130/140647191-6dfe54a1-4077-4819-9c0a-a905de294ce0.png)
