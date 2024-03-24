import { prisma } from "../../lib/prisma";
import { Prisma, Schedule } from "@prisma/client";

import { SchedulesRepository } from "../schedule-repository";

export class PrismaSchedulesRepository implements SchedulesRepository {
  async findAll() {
    return prisma.schedule.findMany();
  }
  async findByProfessionalId(professionalId: string) {
    return prisma.schedule.findMany({
      where: {
        professionals: {
          id: professionalId,
        },
      },
    });
  }
  async findByPacientId(patientId: string) {
    return prisma.schedule.findMany({
      where: {
        patients: {
          id: patientId,
        },
      },
    });
  }
  async findById(id: string) {
    return prisma.schedule.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ScheduleCreateInput) {
    return prisma.schedule.create({
      data,
    });
  }

  async update(schedule: Schedule) {
    const { date, id, status } = schedule;

    return prisma.schedule.update({
      where: {
        id,
      },
      data: {
        date,
        status,
      },
    });
  }
}
