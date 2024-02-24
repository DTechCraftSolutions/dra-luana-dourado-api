import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface FetchScheduleByProfessionalRequest {
  professionalId: string;
}

interface FetchScheduleByProfessionalResponse {
  schedules: Schedule[];
}

export class FetchScheduleByProfessionalUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({
    professionalId,
  }: FetchScheduleByProfessionalRequest): Promise<FetchScheduleByProfessionalResponse> {
    const schedules = await this.schedulesRepository.findByProfessionalId(
      professionalId
    );
    if (!schedules) {
      throw new Error("Schedules not found");
    }

    return {
      schedules,
    };
  }
}
