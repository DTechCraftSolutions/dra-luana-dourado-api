import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function patientRoutes(app: FastifyInstance) {
  app.post("/register-patient", register);
}
