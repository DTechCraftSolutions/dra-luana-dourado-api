import fastify from "fastify";
import { professionalsRoutes } from "./http/controllers/professionals/routes";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { patientRoutes } from "./http/controllers/patient/routes";

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
