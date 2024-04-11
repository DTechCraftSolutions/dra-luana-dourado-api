import { ProfessionalsRepository } from "../repositories/professionals-repository";

interface DeleteProfessionalsRequest {
  id: string;
}

export class DeleteProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({ id }: DeleteProfessionalsRequest): Promise<void> {
    await this.professionalsRepository.delete(id);
  }
}
