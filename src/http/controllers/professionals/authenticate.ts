import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaProfessionalsRepository } from "../../../repositories/prisma/professionals-prisma-repository";
import { AuthenticateProfessionalsUseCase } from "../../../use-case/authenticate-professionals";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const professionalsRepository = new PrismaProfessionalsRepository();
    const authenticateProfessionalsUserUseCase =
      new AuthenticateProfessionalsUseCase(professionalsRepository);

    const { professional } = await authenticateProfessionalsUserUseCase.execute(
      {
        email,
        password,
      }
    );

    const token = await reply.jwtSign({
      sign: {
        sub: professional.id,
      },
    });

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: professional.id,
        expiresIn: "30d",
      },
    });

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (error) {
    return reply.status(401).send({
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}
