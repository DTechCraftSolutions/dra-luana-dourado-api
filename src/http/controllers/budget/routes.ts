import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function budgetRoutes(app: FastifyInstance) {
  app.post("/register-budget", register);
}
