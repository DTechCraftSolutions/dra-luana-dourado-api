import { AvailableTime } from "@prisma/client";
import { AvailableTimeRepository } from "../repositories/available-repository";

interface RegisterAvailableTimesBarberUseCaseRequest {
  availableTimes: {
    initial_time: string;
    end_time: string;
    professionalId: string;
    day_of_week: string;
  }[];
}

interface RegisterAvailableTimesBarberUseCaseResponse {
  availableTimes: AvailableTime[];
}

export class RegisterAvailableTimesBarberUseCase {
  constructor(private availableTimesRepository: AvailableTimeRepository) {}

  async execute({
    availableTimes,
  }: RegisterAvailableTimesBarberUseCaseRequest): Promise<RegisterAvailableTimesBarberUseCaseResponse> {
    const createdAvailableTimes: AvailableTime[] = [];

    for (const {
      initial_time,
      end_time,
      professionalId,
      day_of_week,
    } of availableTimes) {
      const startHours = parseInt(initial_time.split(":")[0]);
      const startMinutes = parseInt(initial_time.split(":")[1]);

      const endHours = parseInt(end_time.split(":")[0]);
      const endMinutes = parseInt(end_time.split(":")[1]);

      const startTime = new Date(1970, 0, 1, startHours, startMinutes);
      const endTime = new Date(1970, 0, 1, endHours, endMinutes);

      const interval = 30 * 60 * 1000; // 30 minutos em milissegundos

      for (
        let currentTime = startTime;
        currentTime <= endTime;
        currentTime.setTime(currentTime.getTime() + interval)
      ) {
        const _label = currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        const createdAvailableTime = await this.availableTimesRepository.create(
          {
            label: _label,
            day_of_week,
            professionals: { connect: { id: professionalId } },
          }
        );

        createdAvailableTimes.push(createdAvailableTime);
      }
    }

    return {
      availableTimes: createdAvailableTimes,
    };
  }
}
