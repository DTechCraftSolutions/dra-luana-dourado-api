import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";

interface ProfileProfessionalsRequest {
  id: string;
}

interface ProfileProfessionalsResponse {
  professional: Professional;
}
export class ProfileProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    id,
  }: ProfileProfessionalsRequest): Promise<ProfileProfessionalsResponse> {
    const professional = await this.professionalsRepository.findById(id);

    if (!professional) {
      throw new Error("Professional not found");
    }

    return { professional };
  }
}
