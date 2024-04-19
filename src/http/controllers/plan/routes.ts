import { FastifyInstance } from "fastify";
import { register } from "./register";
import { findAll } from "./findAll";

export async function planRoutes(app: FastifyInstance) {
  app.post("/register-plan", register);
  app.get("/find-all-plans", findAll);
}
