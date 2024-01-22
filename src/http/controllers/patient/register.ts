import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { RegisterPatientUseCase } from "../../../use-case/register-patient";

const registerPatientBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, phone, email } = registerPatientBodySchema.parse(
      request.body
    );

    const patientsRepository = new PrismaPatientsRepository();

    const registerPatientUseCase = new RegisterPatientUseCase(
      patientsRepository
    );

    await registerPatientUseCase.execute({
      name,
      phone,
      email,
    });

    return reply.status(201).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ validationError: error.errors });
    } else {
      return reply.status(409).send({
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  }
}
