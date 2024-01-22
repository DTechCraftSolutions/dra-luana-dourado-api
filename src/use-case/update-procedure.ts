import { Procedure } from "@prisma/client";
import { ProcedureRepository } from "../repositories/procedure-repository";

export interface UpdateProcedureRequest {
  id: string;
  name?: string;
  type?: "COMUM" | "RECORRENTE";
  duration?: string;
}

export interface UpdateProcedureResponse {
  procedure: Procedure;
}

export class UpdateProcedureUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}
  async execute({
    id,
    name,
    type,
    duration,
  }: UpdateProcedureRequest): Promise<UpdateProcedureResponse> {
    const procedure = await this.proceduresRepository.findById(id);

    if (!procedure) {
      throw new Error("Procedure not found");
    }

    if (procedure.type === "RECORRENTE") {
      if (name) procedure.name = name;
      if (type) procedure.type = type;
      if (duration) procedure.duration = duration;

      const updatedProcedure = await this.proceduresRepository.update(
        procedure
      );
      return {
        procedure: updatedProcedure,
      };
    }
    return { procedure };
  }
}
