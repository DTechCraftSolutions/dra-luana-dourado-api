import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface UpdateScheduleRequest {
  id: string;
  date?: string;
  status?:
    | "AGUARDANDO"
    | "EM_ATENDIMENTO"
    | "CANCELADO"
    | "FINALIZADO"
    | "REAGENDADO"
    | "PENDENTE";
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
  }: UpdateScheduleRequest): Promise<UpdateScheduleResponse> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) throw new Error("Schedule not found");

    if (date) schedule.date = date;
    if (status) schedule.status = status;

    const updatedSchedule = await this.schedulesRepository.update(schedule);

    return {
      schedule: updatedSchedule,
    };
  }
}
