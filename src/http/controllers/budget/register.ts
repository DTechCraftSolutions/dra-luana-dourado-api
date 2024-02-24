import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaBudgetRepository } from "../../../repositories/prisma/budget-prisma-repository";
import { RegisterBudgetUseCase } from "../../../use-case/register-budget";

const registerBudgetBodySchema = z.object({
  price: z.number(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { price } = registerBudgetBodySchema.parse(request.body);

    const budgetRepository = new PrismaBudgetRepository();
    const registerBudgetUseCase = new RegisterBudgetUseCase(budgetRepository);

    await registerBudgetUseCase.execute({
      price,
    });

    return reply.status(201).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      return reply.status(409).send({ error: errorMessage });
    }
  }
}
