import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const patientsRepository = new PrismaPatientsRepository();

    const fetchAllPatientsUseCase = new FetchPatientsUseCase(
      patientsRepository
    );

    const patients = await fetchAllPatientsUseCase.execute({});

    return reply.status(200).send(patients);
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
