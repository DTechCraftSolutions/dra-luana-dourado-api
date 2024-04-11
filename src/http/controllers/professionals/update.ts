import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { UpdatePatientUseCase } from "../../../use-case/update-patient";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";
import { UpdateProfessionalsUseCase } from "../../../use-case/update-professionals";

const updateProfessionalBodySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  CRO: z.string().optional(),
  office: z.enum(["DENTIST", "SECRETARY"]).optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, CRO, office, name, email, password } =
      updateProfessionalBodySchema.parse(request.body);

    const professionalsRepository = new PrismaProfessionalsRepository();

    const updateProfessionalsUseCase = new UpdateProfessionalsUseCase(
      professionalsRepository
    );

    await updateProfessionalsUseCase.execute({
      id,
      CRO,
      office,
      name,
      email,
      password,
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
