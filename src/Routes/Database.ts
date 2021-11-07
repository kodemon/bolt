import { Route } from "cmdo-http";

import { dropDatabase } from "../Lib/Collections";
import { router } from "../Providers/Router";

router.register([
  Route.delete("/api/database", [
    async function () {
      await dropDatabase();
      return this.respond();
    }
  ])
]);
