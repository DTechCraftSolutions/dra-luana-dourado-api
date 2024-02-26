import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

export interface RegisterPatientRequest {
  full_name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  telephone: string;
  comments: string;
  sex: string;
  role: string;
  card_number: string;
  cep: string;
  road: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  complement: string;
}

export interface RegisterPatientResponse {
  patient: Patient;
}
export class RegisterPatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}
  async execute({
    birth_date,
    cep,
    city,
    complement,
    neighborhood,
    number,
    road,
    role,
    state,
    telephone,
    card_number,
    comments,
    cpf,
    full_name,
    rg,
    sex,
  }: RegisterPatientRequest): Promise<RegisterPatientResponse> {
    const patient = await this.patientsRepository.create({
      birth_date,
      cep,
      city,
      complement,
      neighborhood,
      number,
      road,
      role,
      state,
      telephone,
      card_number,
      comments,
      cpf,
      full_name,
      rg,
      sex,
    });

    return { patient };
  }
}
