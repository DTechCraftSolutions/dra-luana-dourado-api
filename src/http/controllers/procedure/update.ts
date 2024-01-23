import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { UpdatePatientUseCase } from "../../../use-case/update-patient";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { UpdateProcedureUseCase } from "../../../use-case/update-procedure";

const updateProcedureBodySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  duration: z.string().optional(),
  type: z.enum(["COMUM", "RECORRENTE"]).optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, name, duration, type } = updateProcedureBodySchema.parse(
      request.body
    );

    const procedureRepository = new PrismaProceduresRepository();

    const updateProcedureUseCase = new UpdateProcedureUseCase(
      procedureRepository
    );

    await updateProcedureUseCase.execute({
      id,
      name,
      duration,
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
