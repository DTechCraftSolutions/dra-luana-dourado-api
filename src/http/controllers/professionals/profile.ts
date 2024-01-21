import { FastifyReply, FastifyRequest } from "fastify";
import { ProfileProfessionalsUseCase } from "../../../use-case/profile-professionalsl";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const professionalRepository = new PrismaProfessionalsRepository();
    const profileProfessionalUseCase = new ProfileProfessionalsUseCase(
      professionalRepository
    );

    const { professional } = await profileProfessionalUseCase.execute({
      id: request.user.sign.sub,
    });

    return reply.status(200).send({
      professionals: {
        ...professional,
        password_hash: undefined,
      },
    });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Profile failed",
    });
  }
}
