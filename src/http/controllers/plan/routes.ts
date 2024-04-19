import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function planRoutes(app: FastifyInstance) {
  app.post("/register-plan", register);
}
