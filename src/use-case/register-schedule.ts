import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface RegisterScheduleRequest {
  date: Date;
  status: "CANCELADO" | "ATENDIDO" | "PENDENTE";
  type: "PLANO" | "PARTICULAR";
  procedureId: string;
  professionalId: string;
  patientId: string;
  availableTimeId: string;
}

interface RegisterScheduleResponse {
  schedule: Schedule;
}

export class RegisterScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({
    date,
    status,
    type,
    procedureId,
    professionalId,
    patientId,
  }: RegisterScheduleRequest): Promise<RegisterScheduleResponse> {
    const schedule = await this.schedulesRepository.create({
      date,
      status,
      type,
      procedures: { connect: { id: procedureId } },
      professionals: { connect: { id: professionalId } },
      patients: { connect: { id: patientId } },
      available_times: { connect: { id: patientId } },
    });

    return {
      schedule,
    };
  }
}
