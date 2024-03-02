import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";

interface FetchAllProfessionalsRequest {}
interface FetchAllProfessionalsResponse {
  professionals: Professional[];
}
export class FetchAllProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}
  async execute({}: FetchAllProfessionalsRequest): Promise<FetchAllProfessionalsResponse> {
    const professionals = await this.professionalsRepository.findAll();

    return { professionals };
  }
}
