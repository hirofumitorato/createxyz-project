// _worker.js  （ルート直下）
import { createRequestHandler } from "react-router";
import * as build from "./apps/web/build/server/index.js";

export default {
  fetch: createRequestHandler({ build }),
};
