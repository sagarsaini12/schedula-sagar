import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DoctorProfile } from '../entities/doctor-profile.entity';

import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';

import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';

import { UpdateRecurringAvailabilityDto } from './dto/update-recurring-availability.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepository: Repository<DoctorProfile>,

    @InjectRepository(RecurringAvailability)
    private readonly recurringRepository: Repository<RecurringAvailability>,

    @InjectRepository(CustomAvailability)
    private readonly customRepository: Repository<CustomAvailability>,

    private readonly usersService: UsersService,
  ) {}

  private async resolveDoctorProfile(
    userId: string,
  ) {
    const user =
      await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const doctor =
      await this.doctorRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (!doctor) {
      throw new NotFoundException(
        'Doctor profile not found',
      );
    }

    return doctor;
  }

  async createRecurringAvailability(
    userId: string,
    dto: CreateRecurringAvailabilityDto,
  ) {
    const doctor =
      await this.resolveDoctorProfile(userId);

    if (dto.startTime >= dto.endTime) {
      throw new ConflictException(
        'End time must be greater than start time',
      );
    }

    const existing =
      await this.recurringRepository.findOne({
        where: {
          doctor: {
            id: doctor.id,
          },
          dayOfWeek: dto.dayOfWeek,
          startTime: dto.startTime,
          endTime: dto.endTime,
        },
        relations: ['doctor'],
      });

    if (existing) {
      throw new ConflictException(
        'Availability already exists',
      );
    }

    const availability =
      this.recurringRepository.create({
        ...dto,
        doctor,
      });

    return this.recurringRepository.save(
      availability,
    );
  }

  async getRecurringAvailabilities(
    userId: string,
  ) {
    const doctor =
      await this.resolveDoctorProfile(userId);

    return this.recurringRepository.find({
      where: {
        doctor: {
          id: doctor.id,
        },
      },
      order: {
        startTime: 'ASC',
      },
    });
  }
  async updateRecurringAvailability(
  userId: string,
  availabilityId: string,
  dto: UpdateRecurringAvailabilityDto,
) {
  const doctor =
    await this.resolveDoctorProfile(userId);

  const availability =
    await this.recurringRepository.findOne({
      where: {
        id: availabilityId,
        doctor: {
          id: doctor.id,
        },
      },
      relations: ['doctor'],
    });

  if (!availability) {
    throw new NotFoundException(
      'Availability not found',
    );
  }

  const startTime =
    dto.startTime ?? availability.startTime;

  const endTime =
    dto.endTime ?? availability.endTime;

  if (startTime >= endTime) {
    throw new ConflictException(
      'End time must be greater than start time',
    );
  }

  Object.assign(
    availability,
    dto,
  );

  return this.recurringRepository.save(
    availability,
  );
}
async deleteRecurringAvailability(
  userId: string,
  availabilityId: string,
) {
  const doctor =
    await this.resolveDoctorProfile(userId);

  const availability =
    await this.recurringRepository.findOne({
      where: {
        id: availabilityId,
        doctor: {
          id: doctor.id,
        },
      },
      relations: ['doctor'],
    });

  if (!availability) {
    throw new NotFoundException(
      'Availability not found',
    );
  }

  await this.recurringRepository.remove(
    availability,
  );

  return {
    message:
      'Availability deleted successfully',
  };
}
}