import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";
import { FetchAllProfessionalsUseCase } from "../../../use-case/fetch-all-professionals";
import { FetchByNameProfessionalsUseCase } from "../../../use-case/fetch-by-name-professionals";

const findNameByIdParamsSchema = z.object({
  id: z.string(),
});

export async function findNameById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const professionalsRepository = new PrismaProfessionalsRepository();

    const fetchNameByIdUseCase = new FetchByNameProfessionalsUseCase(
      professionalsRepository
    );

    const { id } = findNameByIdParamsSchema.parse(request.body);

    const professional = await fetchNameByIdUseCase.execute({
      id,
    });

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
