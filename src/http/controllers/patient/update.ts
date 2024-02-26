import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaPatientsRepository } from "../../../repositories/prisma/patient-prisma-repository";
import { UpdatePatientUseCase } from "../../../use-case/update-patient";

const updatePatientBodySchema = z.object({
  id: z.string(),
  full_name: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  birth_date: z.string().optional(),
  telephone: z.string().optional(),
  comments: z.string().optional(),
  sex: z.string().optional(),
  role: z.string().optional(),
  card_number: z.string().optional(),
  cep: z.string().optional(),
  road: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const {
      id,
      full_name,
      cpf,
      rg,
      birth_date,
      telephone,
      comments,
      sex,
      role,
      card_number,
      cep,
      road,
      neighborhood,
      city,
      state,
      number,
      complement,
    } = updatePatientBodySchema.parse(request.body);

    const patientsRepository = new PrismaPatientsRepository();

    const updatePatientUseCase = new UpdatePatientUseCase(patientsRepository);

    await updatePatientUseCase.execute({
      id,
      full_name,
      cpf,
      rg,
      birth_date,
      telephone,
      comments,
      sex,
      role,
      card_number,
      cep,
      road,
      neighborhood,
      city,
      state,
      number,
      complement,
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
