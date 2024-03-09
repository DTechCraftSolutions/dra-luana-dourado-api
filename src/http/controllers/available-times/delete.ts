import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaAvailableTimeRepository } from "../../../repositories/prisma/available-prisma-repository";
import { RegisterAvailableTimesBarberUseCase } from "../../../use-case/register-available-times-professional";
import { DeleteAvailableTimeUseCase } from "../../../use-case/delete-available-time";

const deleteBodySchema = z.object({
  day_of_week: z.string(),
  initial_time: z.string(),
  end_time: z.string(),
});

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { day_of_week, initial_time, end_time } = deleteBodySchema.parse(
      request.body
    );

    const available_timesRepository = new PrismaAvailableTimeRepository();
    const deleteAvailableTimeUseCase = new DeleteAvailableTimeUseCase(
      available_timesRepository
    );

    await deleteAvailableTimeUseCase.execute({
      day_of_week,
      initial_time,
      end_time,
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(409).send({
      error: error instanceof Error ? error.message : "Delete failed",
    });
  }
}
