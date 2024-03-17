import { ProcedureRepository } from "../repositories/procedure-repository";

export interface DeleteProcedureRequest {
  id: string;
}

export interface DeleteProcedureResponse {}
export class DeleteProcedureUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}

  async execute({
    id,
  }: DeleteProcedureRequest): Promise<DeleteProcedureResponse> {
    await this.proceduresRepository.delete(id);
    return {};
  }
}
