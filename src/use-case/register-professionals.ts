import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";
import { hash } from "bcrypt";

interface RegisterProfessionalsRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  dentist: boolean;
}

interface RegisterProfessionalsResponse {
  professionals: Professional;
}

export class RegisterProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}
  async execute({
    name,
    phone,
    email,
    password,
    dentist,
  }: RegisterProfessionalsRequest): Promise<RegisterProfessionalsResponse> {
    const professionalsWithSameEmail =
      await this.professionalsRepository.findByEmail(email);

    if (professionalsWithSameEmail) {
      throw new Error("Email already in use");
    }

    const password_hash = await hash(password, 6);

    const professional = await this.professionalsRepository.create({
      name,
      phone,
      email,
      password_hash,
      dentist,
    });

    return { professionals: professional };
  }
}
