import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface FetchDetailsPacientScheduleRequest {
  pacientId: string;
}

interface FetchDetailsPacientScheduleResponse {
  scheduleByPacientId: Schedule[];
}

export class FetchDetailsPacientScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({
    pacientId,
  }: FetchDetailsPacientScheduleRequest): Promise<FetchDetailsPacientScheduleResponse> {
    const scheduleByPacientId = await this.schedulesRepository.findByPacientId(
      pacientId
    );

    if (!scheduleByPacientId) throw new Error("Schedule not found");

    return { scheduleByPacientId: scheduleByPacientId };
  }
}
