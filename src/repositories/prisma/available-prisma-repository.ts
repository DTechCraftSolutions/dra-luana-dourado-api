import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

import { AvailableTimeRepository } from "../available-repository";

export class PrismaAvailableTimeRepository implements AvailableTimeRepository {
  async findByDayOfWeek(day_of_week: string) {
    return prisma.availableTime.findMany({
      where: {
        day_of_week: day_of_week,
      },
    });
  }
  async delete(
    day_of_week: string,
    initial_time: string,
    end_time: string
  ): Promise<void> {
    await prisma.availableTime.deleteMany({
      where: {
        day_of_week: day_of_week,
        initial_time: initial_time,
        end_time: end_time,
      },
    });
  }

  async findAll() {
    return prisma.availableTime.findMany();
  }
  async create(data: Prisma.AvailableTimeCreateInput) {
    return prisma.availableTime.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.availableTime.findUnique({
      where: {
        id,
      },
    });
  }
}
