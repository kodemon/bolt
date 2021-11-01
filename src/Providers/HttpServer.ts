import { cors, route, server } from "cmdo-http";

import { router } from "./Router";

/*
 |--------------------------------------------------------------------------------
 | HTTP Server
 |--------------------------------------------------------------------------------
 */

export const hts = server([cors(), route(router)]);
