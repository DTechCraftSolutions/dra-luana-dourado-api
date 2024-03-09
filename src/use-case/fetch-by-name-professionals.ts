import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";

interface FetchByNameProfessionalsRequest {
  id: string;
}

interface FetchByNameProfessionalsResponse {
  professionals: Professional;
}

export class FetchByNameProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}
  async execute({
    id,
  }: FetchByNameProfessionalsRequest): Promise<FetchByNameProfessionalsResponse> {
    const professionals = await this.professionalsRepository.findById(id);

    if (!professionals) {
      throw new Error("Professional not found");
    }

    return { professionals };
  }
}
