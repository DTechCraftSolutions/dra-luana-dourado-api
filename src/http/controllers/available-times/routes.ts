import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function availableTimesRoutes(app: FastifyInstance) {
  app.post("/register-available-times", register);
}
