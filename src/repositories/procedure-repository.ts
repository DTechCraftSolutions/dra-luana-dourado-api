import { Prisma, Procedure } from "@prisma/client";

export interface ProcedureRepository {
  findById(id: string): Promise<Procedure | null>;
  findAll(): Promise<Procedure[]>;
  delete(id: string): Promise<void>;
  create(data: Prisma.ProcedureCreateInput): Promise<Procedure>;
  update(Patient: Procedure): Promise<Procedure>;
}
