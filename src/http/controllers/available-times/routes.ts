import { FastifyInstance } from "fastify";
import { register } from "./register";
import { findAll } from "./findAll";
import { remove } from "./delete";

export async function availableTimesRoutes(app: FastifyInstance) {
  app.post("/register-available-times", register);
  app.get("/find-all-available-times", findAll);
  app.delete("/delete-available-times", remove);
}
