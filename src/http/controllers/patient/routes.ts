import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";

export async function patientRoutes(app: FastifyInstance) {
  app.post("/register-patient", register);
  app.put("/update-patient", update);
}
