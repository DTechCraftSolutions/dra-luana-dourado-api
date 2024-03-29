import { Procedure } from "@prisma/client";
import { ProcedureRepository } from "../repositories/procedure-repository";

interface FetchProcedureByIdRequest {
  id: string;
}

interface FetchProcedureByIdResponse {
  procedure: Procedure;
}
export class FetchProcedureByIdUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}

  async execute({
    id,
  }: FetchProcedureByIdRequest): Promise<FetchProcedureByIdResponse> {
    const procedure = await this.proceduresRepository.findById(id);

    if (!procedure) {
      throw new Error("Procedure not found");
    }
    return { procedure };
  }
}
