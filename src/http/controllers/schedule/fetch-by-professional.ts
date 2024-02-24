import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaSchedulesRepository } from "../../../repositories/prisma/schedule-prisma-repository";
import { FetchScheduleByProfessionalUseCase } from "../../../use-case/fetch-schedule-by-professional";

const fetchScheduleBodySchema = z.object({
  professionalId: z.string(),
});

export async function fetchByProfessional(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { professionalId } = fetchScheduleBodySchema.parse(request.body);

    const schedulesRepository = new PrismaSchedulesRepository();

    const fetchScheduleUseCase = new FetchScheduleByProfessionalUseCase(
      schedulesRepository
    );

    const schedules = await fetchScheduleUseCase.execute({
      professionalId,
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
