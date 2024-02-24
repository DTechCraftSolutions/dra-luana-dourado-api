import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaSchedulesRepository } from "../../../repositories/prisma/schedule-prisma-repository";
import { FetchScheduleUseCase } from "../../../use-case/fetch-schedule";
import { FetchDetailsPacientScheduleUseCase } from "../../../use-case/fetch-details-pacient-schedule";

const fetchScheduleBodySchema = z.object({
  patientId: z.string(),
});

export async function fetchByPatient(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { patientId } = fetchScheduleBodySchema.parse(request.body);

    const schedulesRepository = new PrismaSchedulesRepository();

    const fetchScheduleUseCase = new FetchDetailsPacientScheduleUseCase(
      schedulesRepository
    );

    const schedules = await fetchScheduleUseCase.execute({
      pacientId: patientId,
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
