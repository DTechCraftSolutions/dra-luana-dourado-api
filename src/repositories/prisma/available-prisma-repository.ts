import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

import { AvailableTimeRepository } from "../available-repository";

export class PrismaAvailableTimeRepository implements AvailableTimeRepository {
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
