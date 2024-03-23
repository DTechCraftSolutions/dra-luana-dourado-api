import { AvailableTime } from "@prisma/client";
import { AvailableTimeRepository } from "../repositories/available-repository";

export interface FetchByDayWeekAvailableTimesRequest {
  day_of_week: string;
}
export interface FetchByDayWeekAvailableTimesResponse {
  availableTimes: AvailableTime[];
}
export class FetchByDayWeekAvailableTimes {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({
    day_of_week,
  }: FetchByDayWeekAvailableTimesRequest): Promise<FetchByDayWeekAvailableTimesResponse> {
    const availableTimes = await this.availableTimesRepository.findByDayOfWeek(
      day_of_week
    );
    return {
      availableTimes,
    };
  }
}
