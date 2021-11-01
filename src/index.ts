import { config } from "./Config";
import { setCollectionIndexes } from "./Lib/Collections";
import { mongo } from "./Lib/Mongo";
import { hts } from "./Providers/HttpServer";

/*
 |--------------------------------------------------------------------------------
 | Main
 |--------------------------------------------------------------------------------
 */

(async function main(): Promise<void> {
  await database();
  await providers();
  await routes();
  await projections();
  await start();
})();

/*
 |--------------------------------------------------------------------------------
 | Database Loader
 |--------------------------------------------------------------------------------
 |
 | Establish a connection to the database that is kept alive while the server
 | is running.
 | 
 */

async function database(): Promise<void> {
  await mongo.connect();
  await setCollectionIndexes();
}

/*
 |--------------------------------------------------------------------------------
 | Dependency Injectors
 |--------------------------------------------------------------------------------
 |
 | Register service providers for module dependencies.
 |
 */

async function providers(): Promise<void> {
  await Promise.all([import("./Providers/EventStore")]);
}

/*
 |--------------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------------
 */

async function routes() {
  await Promise.all([import("./Routes/Blocks")]);
}

/*
 |--------------------------------------------------------------------------------
 | Projections
 |--------------------------------------------------------------------------------
 */

async function projections() {
  await Promise.all([import("./Projections/Block")]);
}

/*
 |--------------------------------------------------------------------------------
 | Start
 |--------------------------------------------------------------------------------
 */

async function start(): Promise<void> {
  hts.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}
