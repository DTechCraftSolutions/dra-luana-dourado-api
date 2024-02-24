import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";

export async function budgetRoutes(app: FastifyInstance) {
  app.post("/register-budget", register);
  app.put("/update-budget", update);
}
