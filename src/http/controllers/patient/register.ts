import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { RegisterPatientUseCase } from "../../../use-case/register-patient";

const registerPatientBodySchema = z.object({
  birth_date: z.string(),
  cep: z.string(),
  city: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  road: z.string(),
  role: z.string(),
  state: z.string(),
  telephone: z.string(),
  card_number: z.string(),
  comments: z.string(),
  cpf: z.string(),
  full_name: z.string(),
  rg: z.string(),
  sex: z.string(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const {
      birth_date,
      cep,
      city,
      complement,
      neighborhood,
      number,
      road,
      role,
      state,
      telephone,
      card_number,
      comments,
      cpf,
      full_name,
      rg,
      sex,
    } = registerPatientBodySchema.parse(request.body);

    const patientsRepository = new PrismaPatientsRepository();

    const registerPatientUseCase = new RegisterPatientUseCase(
      patientsRepository
    );

    await registerPatientUseCase.execute({
      birth_date,
      cep,
      city,
      complement,
      neighborhood,
      number,
      road,
      role,
      state,
      telephone,
      card_number,
      comments,
      cpf,
      full_name,
      rg,
      sex,
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
