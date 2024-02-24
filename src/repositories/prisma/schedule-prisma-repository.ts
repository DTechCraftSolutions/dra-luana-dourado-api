import { prisma } from "../../lib/prisma";
import { Prisma, Schedule } from "@prisma/client";

import { SchedulesRepository } from "../schedule-repository";

export class PrismaSchedulesRepository implements SchedulesRepository {
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
    const { date, id, status, type } = schedule;

    return prisma.schedule.update({
      where: {
        id,
      },
      data: {
        date,
        status,
        type,
      },
    });
  }

  async findByDate(date: Date) {
    return prisma.schedule.findFirst({
      where: {
        date,
      },
    });
  }

  async findByType(type: "PLANO" | "PARTICULAR") {
    return prisma.schedule.findMany({
      where: {
        type,
      },
    });
  }
}
