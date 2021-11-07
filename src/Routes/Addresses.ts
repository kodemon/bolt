import { Route } from "cmdo-http";

import { router } from "../Providers/Router";
import { addresses } from "../Services/Addresses";

router.register([
  Route.get("/api/addresses/:address", [
    async function ({ params: { address } }) {
      try {
        const record = await addresses.get(address);
        if (!record) {
          return this.reject(404, "Address does not exist or has been removed");
        }
        return this.respond(record);
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ]),
  Route.get("/api/addresses/:address/transactions", [
    async function ({ params: { address } }) {
      try {
        const record = await addresses.get(address);
        if (!record) {
          return this.reject(404, "Address does not exist or has been removed");
        }
        return this.respond(record.transactions);
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ])
]);
