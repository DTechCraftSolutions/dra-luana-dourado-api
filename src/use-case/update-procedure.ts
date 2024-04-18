import { Procedure } from "@prisma/client";
import { ProcedureRepository } from "../repositories/procedure-repository";

export interface UpdateProcedureRequest {
  id: string;
  name?: string;
  recurrence?: string;
  duration?: string;
  color?: string;
  price?: number;
  description?: string;
  active?: string;
  pricePlan?: number;
}

export interface UpdateProcedureResponse {
  procedure: Procedure;
}

export class UpdateProcedureUseCase {
  constructor(private proceduresRepository: ProcedureRepository) {}
  async execute({
    id,
    name,
    recurrence,
    duration,
    color,
    price,
    description,
    active,
    pricePlan,
  }: UpdateProcedureRequest): Promise<UpdateProcedureResponse> {
    const procedure = await this.proceduresRepository.findById(id);

    if (!procedure) {
      throw new Error("Procedure not found");
    }

    if (name) procedure.name = name;
    if (recurrence) procedure.recurrence = recurrence;
    if (duration) procedure.duration = duration;
    if (color) procedure.color = color;
    if (price) procedure.price = price;
    if (description) procedure.description = description;
    if (active) procedure.active = active;
    if (pricePlan) procedure.pricePlan = pricePlan;

    await this.proceduresRepository.update(procedure);

    return { procedure };
  }
}
