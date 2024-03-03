import { AvailableTime } from "@prisma/client";
import { AvailableTimeRepository } from "../repositories/available-repository";

interface FetchAllAvailableTimesRequest {}

interface FetchAllAvailableTimesResponse {
  availableTimes: AvailableTime[];
}
export class FetchAllAvailableTimes {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({}: FetchAllAvailableTimesRequest): Promise<FetchAllAvailableTimesResponse> {
    const availableTimes = await this.availableTimesRepository.findAll();
    return {
      availableTimes,
    };
  }
}
