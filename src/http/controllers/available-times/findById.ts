import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";
import { FetchPatientsByIdUseCase } from "../../../use-case/fetch-patients-by-id";
import { PrismaAvailableTimeRepository } from "../../../repositories/prisma/available-prisma-repository";
import { FetchAvailableTimesByIdUseCase } from "../../../use-case/fetch-available-times-by-id";

const schema = z.object({
  id: z.string(),
});
export async function findById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const availableTimesRepository = new PrismaAvailableTimeRepository();

    const fetchByIdUseCase = new FetchAvailableTimesByIdUseCase(
      availableTimesRepository
    );

    const { id } = schema.parse(request.body);

    const availableTimes = await fetchByIdUseCase.execute({
      id,
    });

    return reply.status(200).send(availableTimes);
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
