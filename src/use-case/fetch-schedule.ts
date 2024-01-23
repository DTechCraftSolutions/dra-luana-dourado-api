import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface FetchScheduleRequest {
  date?: Date;
  type?: "PLANO" | "PARTICULAR";
}

interface FetchScheduleResponse {
  schedule: Schedule | Schedule[] | null | undefined;
}

export class FetchScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({
    date,
    type,
  }: FetchScheduleRequest): Promise<FetchScheduleResponse> {
    const scheduleByDate = date
      ? await this.schedulesRepository.findByDate(date)
      : null;

    const scheduleByType = type
      ? await this.schedulesRepository.findByType(type)
      : null;

    const schedule = scheduleByDate || scheduleByType || null || undefined;

    return {
      schedule,
    };
  }
}
