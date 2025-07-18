import authRoute from "./auth.route";
import runnerRoute from "./runner.route";
import keyRoute from "./key.route";
import express, { Router } from "express";

const router: Router = express.Router();

const routes = [
  {
    path: "/api/auth",
    route: authRoute,
  },
  {
    path: "/api/runner",
    route: runnerRoute,
  },
  {
    path: "/api/key",
    route: keyRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
