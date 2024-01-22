import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

export interface RegisterPatientRequest {
  name: string;
  phone: string;
  email: string;
}

export interface RegisterPatientResponse {
  patient: Patient;
}
export class RegisterPatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}
  async execute({
    name,
    phone,
    email,
  }: RegisterPatientRequest): Promise<RegisterPatientResponse> {
    const patientWithSameEmail = await this.patientsRepository.findByEmail(
      email
    );

    if (patientWithSameEmail) {
      throw new Error("Email already in use");
    }

    const patient = await this.patientsRepository.create({
      name,
      phone,
      email,
    });

    return { patient };
  }
}
