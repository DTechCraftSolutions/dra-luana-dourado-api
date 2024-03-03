import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";
import { PrismaAvailableTimeRepository } from "../../../repositories/prisma/available-prisma-repository";
import { FetchAllAvailableTimes } from "../../../use-case/fech-all-available-times";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const available_timesRepository = new PrismaAvailableTimeRepository();

    const fetchAllAvailableTimesUseCase = new FetchAllAvailableTimes(
      available_timesRepository
    );

    const available_times = await fetchAllAvailableTimesUseCase.execute({});

    return reply.status(200).send(available_times);
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
