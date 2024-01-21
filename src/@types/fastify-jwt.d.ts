import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWTs {
    professional: {
      sign: {
        sub: string;
      };
    };
  }
}
