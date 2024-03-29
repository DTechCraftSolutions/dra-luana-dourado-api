import { AvailableTime } from "@prisma/client";
import { AvailableTimeRepository } from "../repositories/available-repository";

interface FetchAvailableTimesByIdRequest {
  id: string;
}

interface FetchAvailableTimesByIdResponse {
  availableTimes: AvailableTime;
}
export class FetchAvailableTimesByIdUseCase {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({
    id,
  }: FetchAvailableTimesByIdRequest): Promise<FetchAvailableTimesByIdResponse> {
    const availableTimes = await this.availableTimesRepository.findById(id);

    if (!availableTimes) {
      throw new Error("Available time not found");
    }
    return {
      availableTimes,
    };
  }
}
