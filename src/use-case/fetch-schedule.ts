import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface FetchScheduleRequest {}

interface FetchScheduleResponse {
  schedule: Schedule[];
}

export class FetchScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({}: FetchScheduleRequest): Promise<FetchScheduleResponse> {
    const schedule = await this.schedulesRepository.findAll();

    return {
      schedule,
    };
  }
}
