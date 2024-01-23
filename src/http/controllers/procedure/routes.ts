import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";

export async function procedureRoutes(app: FastifyInstance) {
  app.post("/register-procedure", register);
  app.put("/update-procedure", update);
}
