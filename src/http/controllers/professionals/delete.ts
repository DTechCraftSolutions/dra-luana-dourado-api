import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { RegisterProcedureUseCase } from "../../../use-case/register-procedure";
import { DeleteProcedureUseCase } from "../../../use-case/delete-procedure";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";
import { DeleteProfessionalsUseCase } from "../../../use-case/delete-professionals";

const deleteProfessionalsParamsSchema = z.object({
  id: z.string(),
});

export async function deleteProfessionals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = deleteProfessionalsParamsSchema.parse(request.body);

    const professionalRepository = new PrismaProfessionalsRepository();
    const deleteProfessionalsUseCase = new DeleteProfessionalsUseCase(
      professionalRepository
    );

    await deleteProfessionalsUseCase.execute({
      id,
    });

    return reply.status(200).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : "Delete failed";
      return reply.status(409).send({ error: errorMessage });
    }
  }
}
