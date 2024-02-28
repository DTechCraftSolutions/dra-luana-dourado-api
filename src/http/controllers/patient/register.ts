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
  responsible_name: z.string().optional(),
  responsible_cpf: z.string().optional(),
  responsible_rg: z.string().optional(),
  birth_date_responsible: z.string().optional(),
  telphone_responsible: z.string().optional(),
  comments_responsible: z.string().optional(),
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
      responsible_name,
      responsible_cpf,
      responsible_rg,
      birth_date_responsible,
      telphone_responsible,
      comments_responsible,
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
      responsible_name,
      responsible_cpf,
      responsible_rg,
      birth_date_responsible,
      telphone_responsible,
      comments_responsible,
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
