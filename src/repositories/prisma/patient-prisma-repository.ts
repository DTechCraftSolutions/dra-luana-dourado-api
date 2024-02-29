import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { Patient } from "@prisma/client";

import { PatientsRepository } from "../patient-repository";

export class PrismaPatientsRepository implements PatientsRepository {
  async findByName(name: string) {
    return prisma.patient.findFirst({
      where: {
        full_name: name,
      },
    });
  }
  async findAll() {
    return prisma.patient.findMany();
  }
  async create(data: Prisma.PatientCreateInput) {
    return prisma.patient.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.patient.findUnique({
      where: {
        id,
      },
    });
  }

  async update(Patient: Patient) {
    const {
      id,
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
    } = Patient;
    return prisma.patient.update({
      where: {
        id,
      },
      data: {
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
      },
    });
  }
}
