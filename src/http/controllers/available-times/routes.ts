import { FastifyInstance } from "fastify";
import { register } from "./register";
import { findAll } from "./findAll";
import { remove } from "./delete";
import { findByDayWeek } from "./findByDayWeek";

export async function availableTimesRoutes(app: FastifyInstance) {
  app.post("/register-available-times", register);
  app.get("/find-all-available-times", findAll);
  app.post("/find-by-day-week", findByDayWeek);
  app.delete("/delete-available-times", remove);
}
