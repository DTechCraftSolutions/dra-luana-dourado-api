import { AvailableTimeRepository } from "../repositories/available-repository";

interface DeleteAvailableTimeRequest {
  day_of_week: string;
  initial_time: string;
  end_time: string;
}

interface DeleteAvailableTimeResponse {}

export class DeleteAvailableTimeUseCase {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({
    day_of_week,
    initial_time,
    end_time,
  }: DeleteAvailableTimeRequest): Promise<DeleteAvailableTimeResponse> {
    await this.availableTimesRepository.delete(
      day_of_week,
      initial_time,
      end_time
    );

    return {};
  }
}
