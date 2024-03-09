import { Procedure } from "@prisma/client";
import { ProcedureRepository } from "../repositories/procedure-repository";

interface FetchAllProcedureRequest {}

interface FetchAllProcedureResponse {
  procedures: Procedure[];
}
export class FetchAllProcedureUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}
  async execute({}: FetchAllProcedureRequest): Promise<FetchAllProcedureResponse> {
    const procedures = await this.proceduresRepository.findAll();

    return { procedures };
  }
}
