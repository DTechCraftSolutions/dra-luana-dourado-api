import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

interface FetchPatientsByIdRequest {
  id: string;
}

interface FetchPatientsByIdResponse {
  patient: Patient;
}

export class FetchPatientsByIdUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    id,
  }: FetchPatientsByIdRequest): Promise<FetchPatientsByIdResponse> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new Error("Patient not found");
    }

    return { patient };
  }
}
