import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

interface FetchPatientsRequest {}

interface FetchPatientsResponse {
  patients: Patient[];
}
export class FetchPatientsUseCase {
  constructor(private patientsRepository: PatientsRepository) {}
  async execute({}: FetchPatientsRequest): Promise<FetchPatientsResponse> {
    const patients = await this.patientsRepository.findAll();
    if (!patients) throw new Error("Patients not found");
    return { patients };
  }
}
