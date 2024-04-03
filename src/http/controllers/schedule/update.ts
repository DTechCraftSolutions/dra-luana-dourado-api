import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaSchedulesRepository } from "../../../repositories/prisma/schedule-prisma-repository";
import { UpdateScheduleUseCase } from "../../../use-case/update-schedule";

const updateScheduleBodySchema = z.object({
  id: z.string(),
  date: z.string().optional(),
  status: z
    .enum([
      "AGUARDANDO",
      "EM_ATENDIMENTO",
      "CANCELADO",
      "FINALIZADO",
      "REAGENDADO",
      "PENDENTE",
    ])
    .optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, date, status } = updateScheduleBodySchema.parse(request.body);

    const scheduleRepository = new PrismaSchedulesRepository();

    const updateScheduleUseCase = new UpdateScheduleUseCase(scheduleRepository);

    await updateScheduleUseCase.execute({
      id,
      date,
      status,
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
