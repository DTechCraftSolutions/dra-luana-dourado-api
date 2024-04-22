import { ProcedurePlan } from "@prisma/client";
import { ProcedurePlanRepository } from "../repositories/procedure-plan-prisma-repository";

interface RegisterProcedurePlanRequest {
  name: string;
  recurrence: string;
  duration: string;
  color: string;
  price: number;
  description: string;
  professionalId: string;
  active: string;
  planId?: string;
}

interface RegisterProcedurePlanResponse {}

export class RegisterProcedurePlanUseCase {
  constructor(private procedurePlanRepository: ProcedurePlanRepository) {}

  async execute(procedures: RegisterProcedurePlanRequest[]): Promise<void> {
    const errors: string[] = [];

    for (const procedure of procedures) {
      const {
        name,
        recurrence,
        duration,
        color,
        price,
        description,
        professionalId,
        planId,
        active,
      } = procedure;

      if (!planId) {
        errors.push(`Plan not found for procedure: ${name}`);
      } else {
        await this.procedurePlanRepository.create({
          name,
          recurrence,
          duration,
          color,
          price,
          description,
          active,
          professionals: { connect: { id: professionalId } },
          Plan: { connect: { id: planId } },
        });
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  }
}
