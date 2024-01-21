import { Prisma, Professional } from "@prisma/client";

export interface ProfessionalsRepository {
  findByEmail(email: string): Promise<Professional | null>;
  findById(id: string): Promise<Professional | null>;
  create(data: Prisma.ProfessionalCreateInput): Promise<Professional>;
}
