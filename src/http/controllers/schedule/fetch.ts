import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaSchedulesRepository } from "../../../repositories/prisma/schedule-prisma-repository";
import { FetchScheduleUseCase } from "../../../use-case/fetch-schedule";

const fetchScheduleBodySchema = z.object({
  date: z.date().optional(),
  type: z.enum(["PLANO", "PARTICULAR"]).optional(),
});

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { date, type } = fetchScheduleBodySchema.parse(request.body);

    const schedulesRepository = new PrismaSchedulesRepository();

    const fetchScheduleUseCase = new FetchScheduleUseCase(schedulesRepository);

    const schedules = await fetchScheduleUseCase.execute({
      date,
      type,
    });

    return reply.status(200).send(schedules);
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
