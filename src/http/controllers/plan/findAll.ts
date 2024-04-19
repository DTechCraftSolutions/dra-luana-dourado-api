import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { FetchPatientsUseCase } from "../../../use-case/fetch-patients";
import { PrismaProceduresRepository } from "../../../repositories/prisma/procedure-prisma-repository";
import { FetchAllProcedureUseCase } from "../../../use-case/fetch-all-procedure";
import { PrismaProcedurePlanRepository } from "../../../repositories/prisma/procedure-plan-repository";
import { FindAllPlansUseCase } from "../../../use-case/fetch-all-plans";
import { PrismaPlansRepository } from "../../../repositories/prisma/plan-prisma-repository";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const plansRepository = new PrismaPlansRepository();

    const fetchAllPlansUseCase = new FindAllPlansUseCase(plansRepository);

    const plans = await fetchAllPlansUseCase.execute();

    return reply.status(200).send(plans);
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
