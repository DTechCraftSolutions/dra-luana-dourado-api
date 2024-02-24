import { Prisma, Schedule } from "@prisma/client";

export interface SchedulesRepository {
  findById(id: string): Promise<Schedule | null>;
  create(data: Prisma.ScheduleCreateInput): Promise<Schedule>;
  update(schedule: Schedule): Promise<Schedule>;
  findByDate(date: Date): Promise<Schedule | null>;
  findByType(type: "PLANO" | "PARTICULAR"): Promise<Schedule[]>;
  findByPacientId(patientId: string): Promise<Schedule[]>;
}
