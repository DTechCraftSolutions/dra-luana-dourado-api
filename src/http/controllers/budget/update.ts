import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { UpdatePatientUseCase } from "../../../use-case/update-patient";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { UpdateProcedureUseCase } from "../../../use-case/update-procedure";
import { PrismaBudgetRepository } from "../../../repositories/prisma/budget-prisma-repository";
import { UpdateBudgetUseCase } from "../../../use-case/update-budget";

const updateBudgetBodySchema = z.object({
  id: z.string(),
  price: z.number().optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, price } = updateBudgetBodySchema.parse(request.body);

    const budgetRepository = new PrismaBudgetRepository();

    const updateBudgetUseCase = new UpdateBudgetUseCase(budgetRepository);

    await updateBudgetUseCase.execute({
      id,
      price,
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
