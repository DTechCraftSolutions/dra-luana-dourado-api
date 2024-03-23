import { AvailableTime, Prisma } from "@prisma/client";

export interface AvailableTimeRepository {
  findById(id: string): Promise<AvailableTime | null>;
  findAll(): Promise<AvailableTime[]>;
  create(data: Prisma.AvailableTimeCreateInput): Promise<AvailableTime>;
  delete(
    day_of_week: string,
    initial_time: string,
    end_time: string
  ): Promise<void>;
  findByDayOfWeek(day_of_week: string): Promise<AvailableTime[]>;
}
