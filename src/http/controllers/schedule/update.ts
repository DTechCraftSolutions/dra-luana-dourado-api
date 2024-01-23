import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaSchedulesRepository } from "../../../repositories/prisma/schedule-prisma-repository";
import { UpdateScheduleUseCase } from "../../../use-case/update-schedule";

const updateScheduleBodySchema = z.object({
  id: z.string(),
  date: z.date().optional(),
  status: z.enum(["CANCELADO", "ATENDIDO", "PENDENTE"]).optional(),
  type: z.enum(["PLANO", "PARTICULAR"]).optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, date, status, type } = updateScheduleBodySchema.parse(
      request.body
    );

    const scheduleRepository = new PrismaSchedulesRepository();

    const updateScheduleUseCase = new UpdateScheduleUseCase(scheduleRepository);

    await updateScheduleUseCase.execute({
      id,
      date,
      status,
      type,
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Update failed",
    });
  }
}
