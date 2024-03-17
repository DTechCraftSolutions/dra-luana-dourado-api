import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { findAll } from "./findAll";
import { deleteProcedure } from "./delete";

export async function procedureRoutes(app: FastifyInstance) {
  app.post("/register-procedure", register);
  app.put("/update-procedure", update);
  app.get("/find-all-procedures", findAll);
  app.delete("/delete-procedure", deleteProcedure);
}
