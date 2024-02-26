import { Patient } from "@prisma/client";
import { PatientsRepository } from "../repositories/patient-repository";

interface UpdatePatientRequest {
  id: string;
  full_name?: string;
  cpf?: string;
  rg?: string;
  birth_date?: string;
  telephone?: string;
  comments?: string;
  sex?: string;
  role?: string;
  card_number?: string;
  cep?: string;
  road?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  number?: string;
  complement?: string;
}

interface UpdatePatientResponse {
  patient: Patient;
}

export class UpdatePatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    id,
    full_name,
    cpf,
    rg,
    birth_date,
    telephone,
    comments,
    sex,
    role,
    card_number,
    cep,
    road,
    neighborhood,
    city,
    state,
    number,
    complement,
  }: UpdatePatientRequest): Promise<UpdatePatientResponse> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new Error("Patient not found");
    }

    if (full_name) patient.full_name = full_name;
    if (cpf) patient.cpf = cpf;
    if (rg) patient.rg = rg;
    if (birth_date) patient.birth_date = birth_date;
    if (telephone) patient.telephone = telephone;
    if (comments) patient.comments = comments;
    if (sex) patient.sex = sex;
    if (role) patient.role = role;
    if (card_number) patient.card_number = card_number;
    if (cep) patient.cep = cep;
    if (road) patient.road = road;
    if (neighborhood) patient.neighborhood = neighborhood;
    if (city) patient.city = city;
    if (state) patient.state = state;
    if (number) patient.number = number;
    if (complement) patient.complement = complement;

    const updatedPatient = await this.patientsRepository.update(patient);

    return { patient: updatedPatient };
  }
}
