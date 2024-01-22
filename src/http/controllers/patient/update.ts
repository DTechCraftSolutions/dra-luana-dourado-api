import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { UpdatePatientUseCase } from "../../../use-case/update-patient";

const registerPatientBodySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, name, phone, email } = registerPatientBodySchema.parse(
      request.body
    );

    const patientsRepository = new PrismaPatientsRepository();

    const updatePatientUseCase = new UpdatePatientUseCase(patientsRepository);

    await updatePatientUseCase.execute({
      id,
      name,
      phone,
      email,
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    }

    return reply.status(500).send({
      error: error instanceof Error ? error.message : "Update failed",
    });
  }
}
