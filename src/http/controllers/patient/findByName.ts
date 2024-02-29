import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";
import { FetchByNamePatientsUseCase } from "../../../use-case/fetch-by-name-patients";

const findByNameBodySchema = z.object({
  full_name: z.string(),
});

export async function findByName(request: FastifyRequest, reply: FastifyReply) {
  try {
    const patientsRepository = new PrismaPatientsRepository();

    const fetchAllPatientsUseCase = new FetchByNamePatientsUseCase(
      patientsRepository
    );

    const { full_name } = findByNameBodySchema.parse(request.body);

    const patients = await fetchAllPatientsUseCase.execute({
      full_name,
    });

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
