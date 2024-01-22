import { Procedure } from "@prisma/client";
import { ProcedureRepository } from "../repositories/procedure-repository";

interface RegisterProcedureRequest {
  name: string;
  type: "COMUM" | "RECORRENTE";
  duration: string;
  professionalId: string;
}

interface RegisterProcedureResponse {
  procedure: Procedure;
}

export class RegisterProcedureUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}

  async execute({
    professionalId,
    name,
    type,
    duration,
  }: RegisterProcedureRequest): Promise<RegisterProcedureResponse> {
    const procedure = await this.proceduresRepository.create({
      name,
      type,
      duration,
      professionals: { connect: { id: professionalId } },
    });
    return {
      procedure,
    };
  }
}
