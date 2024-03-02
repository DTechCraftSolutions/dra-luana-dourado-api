import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";
import { FetchAllProfessionalsUseCase } from "../../../use-case/fetch-all-professionals";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const professionalsRepository = new PrismaProfessionalsRepository();

    const fetchAllPatientsUseCase = new FetchAllProfessionalsUseCase(
      professionalsRepository
    );

    const professional = await fetchAllPatientsUseCase.execute({});

    return reply.status(200).send(professional);
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
