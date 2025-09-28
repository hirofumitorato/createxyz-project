// _worker.js  （ルート直下）
import { createRequestHandler } from "react-router";
import * as build from "./build/server/index.js";

export default {
  fetch: createRequestHandler({ build }),
};
