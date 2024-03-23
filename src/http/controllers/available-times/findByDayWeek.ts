import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaAvailableTimeRepository } from "../../../repositories/prisma/available-prisma-repository";
import { FetchByDayWeekAvailableTimes } from "../../../use-case/fetch-by-dayWeek-available-times";

const findByNameBodySchema = z.object({
  day_of_week: z.string(),
});
export async function findByDayWeek(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const available_timesRepository = new PrismaAvailableTimeRepository();

    const fetchAllAvailableTimesUseCase = new FetchByDayWeekAvailableTimes(
      available_timesRepository
    );

    const { day_of_week } = findByNameBodySchema.parse(request.body);
    const available_times = await fetchAllAvailableTimesUseCase.execute({
      day_of_week,
    });

    return reply.status(200).send(available_times);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else {
      return reply.status(409).send({
        error: error instanceof Error ? error.message : "Fetch failed",
      });
    }
  }
}
