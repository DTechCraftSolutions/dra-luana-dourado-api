import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { FetchAllProcedureUseCase } from "../../../use-case/fetch-all-procedure";
import { FetchProcedureByIdUseCase } from "../../../use-case/fetch-procedure-by-id";

const schema = z.object({
  id: z.string(),
});
export async function findById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const proceduresRepository = new PrismaProceduresRepository();

    const fetchByIdProceduresUseCase = new FetchProcedureByIdUseCase(
      proceduresRepository
    );

    const { id } = schema.parse(request.body);
    const procedures = await fetchByIdProceduresUseCase.execute({
      id,
    });

    return reply.status(200).send(procedures);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else {
      return reply.status(409).send({
        error: error instanceof Error ? error.message : "Fetch failed",
      });
    }
  }
}
