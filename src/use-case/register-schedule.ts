import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "../repositories/schedule-repository";

interface RegisterScheduleRequest {
  date: Date;
  status:
    | "AGUARDANDO"
    | "EM_ATENDIMENTO"
    | "CANCELADO"
    | "FINALIZADO"
    | "REAGENDADO"
    | "PENDENTE";

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
    procedureId,
    professionalId,
    patientId,
  }: RegisterScheduleRequest): Promise<RegisterScheduleResponse> {
    const schedule = await this.schedulesRepository.create({
      date,
      status,
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
