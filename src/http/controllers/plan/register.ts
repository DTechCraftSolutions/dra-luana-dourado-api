import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPlansRepository } from "../../../repositories/prisma/plan-prisma-repository";
import { RegisterPlanUseCase } from "../../../use-case/register-plan";

const registerPlaBodySchema = z.object({
  name: z.string(),
  duration: z.number(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, duration } = registerPlaBodySchema.parse(request.body);

    const planRepository = new PrismaPlansRepository();
    const registerPlanUseCase = new RegisterPlanUseCase(planRepository);

    await registerPlanUseCase.execute({
      duration,
      name,
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
