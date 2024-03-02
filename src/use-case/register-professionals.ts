import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";
import { hash } from "bcrypt";

interface RegisterProfessionalsRequest {
  name: string;
  email: string;
  password: string;
  office: "DENTIST" | "SECRETARY";
  CRO?: string;
}

interface RegisterProfessionalsResponse {
  professionals: Professional;
}

export class RegisterProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}
  async execute({
    name,
    email,
    CRO,
    office,
    password,
  }: RegisterProfessionalsRequest): Promise<RegisterProfessionalsResponse> {
    const professionalsWithSameEmail =
      await this.professionalsRepository.findByEmail(email);

    if (professionalsWithSameEmail) {
      throw new Error("Email already in use");
    }

    const password_hash = await hash(password, 6);

    const professional = await this.professionalsRepository.create({
      name,
      office,
      email,
      password_hash,
      CRO,
    });

    return { professionals: professional };
  }
}
