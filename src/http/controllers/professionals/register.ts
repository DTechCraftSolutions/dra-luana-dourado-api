import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";
import { RegisterProfessionalsUseCase } from "../../../use-case/register-professionals";

const registerProfessionalsBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  dentist: z.boolean().default(true),
});

export async function registerProfessionals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, phone, email, password, dentist } =
      registerProfessionalsBodySchema.parse(request.body);

    const professionalsRepository = new PrismaProfessionalsRepository();

    const registerProfessionalsUseCase = new RegisterProfessionalsUseCase(
      professionalsRepository
    );

    await registerProfessionalsUseCase.execute({
      name,
      phone,
      email,
      password,
      dentist,
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
