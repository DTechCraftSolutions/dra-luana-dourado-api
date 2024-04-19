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
  color: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  recurrence: z.string().optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, name, duration, color, description, price, recurrence } =
      updateProcedureBodySchema.parse(request.body);

    const procedureRepository = new PrismaProceduresRepository();

    const updateProcedureUseCase = new UpdateProcedureUseCase(
      procedureRepository
    );

    await updateProcedureUseCase.execute({
      id,
      name,
      duration,
      color,
      description,
      price,
      recurrence,
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
