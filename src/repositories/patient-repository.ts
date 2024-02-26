import { Prisma, Patient } from "@prisma/client";

export interface PatientsRepository {
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  create(data: Prisma.PatientCreateInput): Promise<Patient>;
  update(Patient: Patient): Promise<Patient>;
}
