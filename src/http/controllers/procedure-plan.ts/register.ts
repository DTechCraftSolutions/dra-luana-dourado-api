import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaProcedurePlanRepository } from "../../../repositories/prisma/procedure-plan-repository";
import { RegisterProcedurePlanUseCase } from "../../../use-case/register-procedure-plan";

const registerProcedurePlanBodySchema = z.object({
  procedures: z.array(
    z.object({
      duration: z.string(),
      name: z.string(),
      professionalId: z.string(),
      color: z.string(),
      recurrence: z.string(),
      description: z.string(),
      price: z.number(),
      planId: z.string(),
      active: z.string(),
    })
  ),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { procedures } = registerProcedurePlanBodySchema.parse(request.body);

    const procedurePlanRepository = new PrismaProcedurePlanRepository();
    const registerProcedurePlanUseCase = new RegisterProcedurePlanUseCase(
      procedurePlanRepository
    );

    await registerProcedurePlanUseCase.execute(procedures);

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
