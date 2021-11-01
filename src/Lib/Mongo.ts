import { MongoClient } from "mongodb";

import { config } from "../Config";

export class Mongo {
  public readonly name: string;
  public readonly client: MongoClient;

  constructor(name: string, uri: string) {
    this.name = name;
    this.client = new MongoClient(uri);
  }

  public async connect() {
    await this.client.connect();
    this.client.on("close", () => {
      this.connect();
    });
  }

  public get db() {
    return this.client.db(this.name);
  }

  public collection<T = any>(name: string) {
    return this.db.collection<T>(name);
  }
}

export const mongo = new Mongo(config.mongo.name, config.mongo.uri);
