import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { fetch } from "./fetch";

export async function scheduleRoutes(app: FastifyInstance) {
  app.post("/register-schedule", register);
  app.put("/update-schedule", update);
  app.get("/find-schedule", fetch);
}
