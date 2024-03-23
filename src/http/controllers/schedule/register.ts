import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaSchedulesRepository } from "../../../repositories/prisma/schedule-prisma-repository";
import { RegisterScheduleUseCase } from "../../../use-case/register-schedule";

const registerScheduleBodySchema = z.object({
  date: z.date(),
  patientId: z.string(),
  procedureId: z.string(),
  professionalId: z.string(),
  status: z.enum([
    "AGUARDANDO",
    "EM_ATENDIMENTO",
    "CANCELADO",
    "FINALIZADO",
    "REAGENDADO",
    "PENDENTE",
  ]),
  availableTimeId: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const {
      date,
      patientId,
      procedureId,
      professionalId,
      status,
      availableTimeId,
    } = registerScheduleBodySchema.parse(request.body);

    const schedulesRepository = new PrismaSchedulesRepository();

    const registerScheduleUseCase = new RegisterScheduleUseCase(
      schedulesRepository
    );

    await registerScheduleUseCase.execute({
      date,
      patientId,
      procedureId,
      professionalId,
      status,
      availableTimeId,
    });

    return reply.status(201).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else {
      return reply.status(409).send({
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }
}
