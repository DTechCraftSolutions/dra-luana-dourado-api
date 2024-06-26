import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function procedurePlanRoutes(app: FastifyInstance) {
  app.post("/register-procedure-plan", register);
}
