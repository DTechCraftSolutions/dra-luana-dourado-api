import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface UpdateScheduleRequest {
  id: string;
  date?: Date;
  status?: "CANCELADO" | "ATENDIDO" | "PENDENTE";
  type?: "PLANO" | "PARTICULAR";
}

interface UpdateScheduleResponse {
  schedule: Schedule;
}

export class UpdateScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({
    id,
    date,
    status,
    type,
  }: UpdateScheduleRequest): Promise<UpdateScheduleResponse> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) throw new Error("Schedule not found");

    if (date) schedule.date = date;
    if (status) schedule.status = status;
    if (type) schedule.type = type;

    const updatedSchedule = await this.schedulesRepository.update(schedule);

    return {
      schedule: updatedSchedule,
    };
  }
}
