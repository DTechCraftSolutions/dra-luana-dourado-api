import fastify from "fastify";
import { professionalsRoutes } from "./http/controllers/professionals/routes";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { patientRoutes } from "./http/controllers/patient/routes";
import { procedureRoutes } from "./http/controllers/procedure/routes";
import { scheduleRoutes } from "./http/controllers/schedule/routes";

export const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);
app.register(professionalsRoutes);
app.register(patientRoutes);
app.register(procedureRoutes);
app.register(scheduleRoutes);
