import { Prisma, Professional } from "@prisma/client";

export interface ProfessionalsRepository {
  findByEmail(email: string): Promise<Professional | null>;
  findByName(name: string): Promise<Professional | null>;
  findById(id: string): Promise<Professional | null>;
  findAll(): Promise<Professional[]>;
  create(data: Prisma.ProfessionalCreateInput): Promise<Professional>;
  update(professional: Professional): Promise<Professional>;
  delete(id: string): Promise<void>;
}
