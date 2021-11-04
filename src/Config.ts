import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 8370,
  mongo: {
    name: process.env.MONGO_STREAMS_NAME || "bolt",
    uri: process.env.MONGO_STREAMS_URI || "mongodb://localhost:27027/?maxPoolSize=20&w=majority"
  }
};
