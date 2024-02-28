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

  responsible_name?: string;
  responsible_cpf?: string;
  responsible_rg?: string;
  birth_date_responsible?: string;
  telphone_responsible?: string;
  comments_responsible?: string;
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
    responsible_name,
    responsible_cpf,
    responsible_rg,
    birth_date_responsible,
    telphone_responsible,
    comments_responsible,
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
      responsible_name: responsible_name ?? undefined,
      responsible_cpf: responsible_cpf ?? undefined,
      responsible_rg: responsible_rg ?? undefined,
      birth_date_responsible: birth_date_responsible ?? undefined,
      telphone_responsible: telphone_responsible ?? undefined,
      comments_responsible: comments_responsible ?? undefined,
    });

    return { patient };
  }
}
