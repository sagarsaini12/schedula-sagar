import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DoctorProfile } from '../doctor/entities/doctor-profile.entity';
import { RecurringAvailability } from '../doctor/availability/entities/recurring-availability.entity';
import { CustomAvailability } from '../doctor/availability/entities/custom-availability.entity';

import { GetDoctorSlotsDto } from './dto/get-doctor-slots.dto';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepository: Repository<DoctorProfile>,

    @InjectRepository(RecurringAvailability)
    private readonly recurringRepository: Repository<RecurringAvailability>,

    @InjectRepository(CustomAvailability)
    private readonly customRepository: Repository<CustomAvailability>,
  ) {}

  async getDoctorSlots(
    doctorId: string,
    query: GetDoctorSlotsDto,
  ) {
    const doctor =
      await this.doctorRepository.findOne({
        where: {
          id: doctorId,
        },
      });

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    const duration =
      Number(query.duration);

    if (
      ![10, 15, 30].includes(duration)
    ) {
      throw new BadRequestException(
        'Duration must be 10, 15, or 30 minutes',
      );
    }

    const selectedDate =
      new Date(query.date);

    if (
      isNaN(selectedDate.getTime())
    ) {
      throw new BadRequestException(
        'Invalid date',
      );
    }

    const today = new Date();
    today.setHours(
      0,
      0,
      0,
      0,
    );

    if (selectedDate < today) {
      throw new BadRequestException(
        'Past date is not allowed',
      );
    }

    const customAvailability =
      await this.customRepository.find({
        where: {
          doctor: {
            id: doctorId,
          },
          date: query.date,
        },
      });

    let startTime: string;
    let endTime: string;

    if (
      customAvailability.length > 0
    ) {
      startTime =
        customAvailability[0]
          .startTime;

      endTime =
        customAvailability[0]
          .endTime;
    } else {
      const dayOfWeek =
        selectedDate
          .toLocaleDateString(
            'en-US',
            {
              weekday: 'long',
            },
          )
          .toUpperCase();

      const recurringAvailability =
        await this.recurringRepository.find(
          {
            where: {
              doctor: {
                id: doctorId,
              },
              dayOfWeek:
                dayOfWeek as any,
            },
          },
        );

      if (
        recurringAvailability.length ===
        0
      ) {
        throw new NotFoundException(
          'No availability found',
        );
      }

      startTime =
        recurringAvailability[0]
          .startTime;

      endTime =
        recurringAvailability[0]
          .endTime;
    }

    const slots =
      this.generateSlots(
        startTime,
        endTime,
        duration,
      );

    const futureSlots =
  this.filterPastSlots(
    slots,
    query.date,
  );

const bookedSlots: string[] = [];

const availableSlots =
  futureSlots.filter(
    (slot) =>
      !bookedSlots.includes(
        slot.startTime,
      ),
  );

if (
  availableSlots.length === 0
) {
  throw new NotFoundException(
    'No slots available',
  );
}

    return {
      doctorId,
      date: query.date,
      duration,
      slots: availableSlots,
    };
  }

  private generateSlots(
    startTime: string,
    endTime: string,
    duration: number,
  ) {
    const slots = [];

    const start =
      this.timeToMinutes(
        startTime,
      );

    const end =
      this.timeToMinutes(
        endTime,
      );

    for (
      let current = start;
      current + duration <= end;
      current += duration
    ) {
      slots.push({
        startTime:
          this.minutesToTime(
            current,
          ),
        endTime:
          this.minutesToTime(
            current +
              duration,
          ),
      });
    }

    return slots;
  }

  private filterPastSlots(
  slots: any[],
  date: string,
) {
  const today =
    new Date()
      .toISOString()
      .split('T')[0];

  if (date !== today) {
    return slots;
  }

  const now = new Date();

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();

  return slots.filter(
    (slot) =>
      this.timeToMinutes(
        slot.endTime,
      ) > currentMinutes,
  );
}

  private timeToMinutes(
    time: string,
  ) {
    const [hours, minutes] =
      time
        .split(':')
        .map(Number);

    return (
      hours * 60 +
      minutes
    );
  }

  private minutesToTime(
    totalMinutes: number,
  ) {
    const hours =
      Math.floor(
        totalMinutes / 60,
      )
        .toString()
        .padStart(2, '0');

    const minutes =
      (totalMinutes % 60)
        .toString()
        .padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}