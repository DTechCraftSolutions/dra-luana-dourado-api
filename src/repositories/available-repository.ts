import { AvailableTime, Prisma } from "@prisma/client";

export interface AvailableTimeRepository {
  findById(id: string): Promise<AvailableTime | null>;
  findAll(): Promise<AvailableTime[]>;
  create(data: Prisma.AvailableTimeCreateInput): Promise<AvailableTime>;
}
