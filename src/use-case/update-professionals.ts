import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";

interface UpdateProfessionalsRequest {
  id: string;
  name?: string;
  email?: string;
  CRO?: string;
  office?: "SECRETARY" | "DENTIST";
  password?: string;
}

interface UpdateProfessionalsResponse {
  professional: Professional;
}
export class UpdateProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    id,
    name,
    email,
    CRO,
    office,
    password,
  }: UpdateProfessionalsRequest): Promise<UpdateProfessionalsResponse> {
    const professional = await this.professionalsRepository.findById(id);

    if (!professional) {
      throw new Error("Professional not found");
    }

    if (name) professional.name = name;
    if (email) professional.email = email;
    if (CRO) professional.CRO = CRO;
    if (office) professional.office = office;
    if (password) professional.password_hash = password;

    await this.professionalsRepository.update(professional);

    return {
      professional,
    };
  }
}
