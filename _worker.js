// _worker.js (repo root)
import { createRequestHandler } from "react-router";
import * as build from "./build/server/index.js";
export default {
  async fetch(request, env, ctx) {
    return createRequestHandler({ build, mode: "production" })(request);
  },
};
