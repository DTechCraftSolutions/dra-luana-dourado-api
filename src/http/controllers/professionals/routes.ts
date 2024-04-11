import { FastifyInstance } from "fastify";
import { registerProfessionals } from "./register";
import { authenticate } from "./authenticate";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";
import { profile } from "./profile";
import { findAll } from "./findAll";
import { findNameById } from "./findNameById";
import { update } from "./update";

export async function professionalsRoutes(app: FastifyInstance) {
  app.post("/register-professionals", registerProfessionals);

  app.put("/update-professionals", update);

  app.patch("/refresh-token-professionals", refresh);

  app.post("/authenticate-professionals", authenticate);

  app.get("/profile-professionals", { onRequest: [verifyJwt] }, profile);

  app.get("/find-all-professionals", findAll);

  app.post("/find-by-name-professionals", findNameById);
}
