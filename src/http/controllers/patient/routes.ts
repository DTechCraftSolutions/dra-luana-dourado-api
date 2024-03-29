import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { findAll } from "./findAll";
import { findByName } from "./findByName";
import { findById } from "./findById";
export async function patientRoutes(app: FastifyInstance) {
  app.post("/register-patient", register);
  app.put("/update-patient", update);
  app.get("/find-all-patient", findAll);
  app.post("/find-patient-by-name", findByName);
  app.post("/find-by-id-patient", findById);
}
