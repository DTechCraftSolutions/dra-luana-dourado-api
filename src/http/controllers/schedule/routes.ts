import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { fetch } from "./fetch";
import { fetchByPatient } from "./fetch-by-patient";
import { fetchByProfessional } from "./fetch-by-professional";

export async function scheduleRoutes(app: FastifyInstance) {
  app.post("/register-schedule", register);
  app.put("/update-schedule", update);
  app.get("/find-schedule", fetch);
  app.get("/find-schedule-by-patient", fetchByPatient);
  app.post("/find-schedule-by-professional", fetchByProfessional);
}
