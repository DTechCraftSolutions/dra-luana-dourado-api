import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { RegisterProcedureUseCase } from "../../../use-case/register-procedure";

const registerProcedureBodySchema = z.object({
  duration: z.string(),
  name: z.string(),
  professionalId: z.string(),
  type: z.enum(["COMUM", "RECORRENTE"]),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, duration, professionalId, type } =
      registerProcedureBodySchema.parse(request.body);

    const procedureRepository = new PrismaProceduresRepository();
    const registerProcedureUseCase = new RegisterProcedureUseCase(
      procedureRepository
    );

    await registerProcedureUseCase.execute({
      duration,
      name,
      professionalId,
      type,
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
