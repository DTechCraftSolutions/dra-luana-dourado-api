import { Professional } from "@prisma/client";
import { ProfessionalsRepository } from "../repositories/professionals-repository";
import { compare } from "bcrypt";
interface AuthenticateProfessionalsRequest {
  email: string;
  password: string;
}

interface AuthenticateProfessionalsResponse {
  professional: Professional;
}

export class AuthenticateProfessionalsUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateProfessionalsRequest): Promise<AuthenticateProfessionalsResponse> {
    const professional = await this.professionalsRepository.findByEmail(email);

    if (!professional) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, professional.password_hash);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return { professional };
  }
}
