import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaAvailableTimeRepository } from "../../../repositories/prisma/available-prisma-repository";
import { RegisterAvailableTimesBarberUseCase } from "../../../use-case/register-available-times-professional";

const registerBodySchema = z.object({
  availableTimes: z.array(
    z.object({
      initial_time: z.string(),
      end_time: z.string(),
      day_of_week: z.string(),
      professionalId: z.string(),
    })
  ),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { availableTimes } = registerBodySchema.parse(request.body);

    const available_timesRepository = new PrismaAvailableTimeRepository();
    const registerAvailableTimeUseCase =
      new RegisterAvailableTimesBarberUseCase(available_timesRepository);

    await registerAvailableTimeUseCase.execute({ availableTimes });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(409).send({
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
}
