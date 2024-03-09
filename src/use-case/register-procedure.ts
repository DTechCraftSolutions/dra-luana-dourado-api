import { Procedure } from "@prisma/client";
import { ProcedureRepository } from "../repositories/procedure-repository";

interface RegisterProcedureRequest {
  name: string;
  recurrence: string;
  duration: string;
  color: string;
  description: string;
  professionalId: string;
  price: number;
}

interface RegisterProcedureResponse {
  procedure: Procedure;
}

export class RegisterProcedureUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}

  async execute({
    professionalId,
    name,
    color,
    description,
    duration,
    recurrence,
    price,
  }: RegisterProcedureRequest): Promise<RegisterProcedureResponse> {
    const procedure = await this.proceduresRepository.create({
      name,
      color,
      description,
      duration,
      recurrence,
      price,
      professionals: { connect: { id: professionalId } },
    });
    return {
      procedure,
    };
  }
}
