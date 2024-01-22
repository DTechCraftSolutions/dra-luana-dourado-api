import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

interface UpdatePatientRequest {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
}

interface UpdatePatientResponse {
  patient: Patient;
}

export class UpdatePatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    id,
    name,
    phone,
    email,
  }: UpdatePatientRequest): Promise<UpdatePatientResponse> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new Error("Patient not found");
    }

    if (email) patient.email = email;
    if (name) patient.name = name;
    if (phone) patient.phone = phone;

    const updatedPatient = await this.patientsRepository.update(patient);

    return { patient: updatedPatient };
  }
}
