import { ProfessionalsRepository } from "../repositories/professionals-repository";

interface DeleteProfessionalsRequest {
  id: string;
}

interface DeleteProfessionalsResponse {}

export class DeleteProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    id,
  }: DeleteProfessionalsRequest): Promise<DeleteProfessionalsResponse> {
    await this.professionalsRepository.delete(id);
    return {};
  }
}
