import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

interface FetchByNamePatientsRequest {
  name: string;
}
interface FetchByNamePatientsResponse {
  patients: Patient;
}
export class FetchByNamePatientsUseCase {
  constructor(private patientsRepository: PatientsRepository) {}
  async execute({
    name,
  }: FetchByNamePatientsRequest): Promise<FetchByNamePatientsResponse> {
    const patients = await this.patientsRepository.findByName(name);
    if (!patients) throw new Error("Patients not found");
    return { patients };
  }
}
