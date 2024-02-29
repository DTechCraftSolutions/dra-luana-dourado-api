import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { findAll } from "./findAll";
import { findByName } from "./findByName";
export async function patientRoutes(app: FastifyInstance) {
  app.post("/register-patient", register);
  app.put("/update-patient", update);
  app.get("/find-all-patient", findAll);
  app.get("/find-patient-by-name", findByName);
}
