import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { FetchAllProcedureUseCase } from "../../../use-case/fetch-all-procedure";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const proceduresRepository = new PrismaProceduresRepository();

    const fetchAllProceduresUseCase = new FetchAllProcedureUseCase(
      proceduresRepository
    );

    const procedures = await fetchAllProceduresUseCase.execute({});

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
