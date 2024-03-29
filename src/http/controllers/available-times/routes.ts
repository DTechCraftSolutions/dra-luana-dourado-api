import { FastifyInstance } from "fastify";
import { register } from "./register";
import { findAll } from "./findAll";
import { remove } from "./delete";
import { findByDayWeek } from "./findByDayWeek";
import { findById } from "./findById";

export async function availableTimesRoutes(app: FastifyInstance) {
  app.post("/register-available-times", register);
  app.post("/find-by-id-available-times", findById);
  app.get("/find-all-available-times", findAll);
  app.post("/find-by-day-week", findByDayWeek);
  app.delete("/delete-available-times", remove);
}
