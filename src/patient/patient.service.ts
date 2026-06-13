import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientProfile } from './entities/patient-profile.entity';

import { UsersService } from '../users/users.service';

import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientProfile)
    private readonly patientRepository: Repository<PatientProfile>,

    private readonly usersService: UsersService,
  ) {}

  async createProfile(
    userId: string,
    dto: CreatePatientProfileDto,
  ) {
    const existingProfile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (existingProfile) {
      throw new ConflictException(
        'Patient profile already exists',
      );
    }

    const user =
      await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const profile =
      this.patientRepository.create({
        ...dto,
        user,
      });

    return this.patientRepository.save(profile);
  }

  async getProfile(userId: string) {
    const profile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (!profile) {
      throw new NotFoundException(
        'Patient profile not found',
      );
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdatePatientProfileDto,
  ) {
    const profile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (!profile) {
      throw new NotFoundException(
        'Patient profile not found',
      );
    }

    Object.assign(profile, dto);

    return this.patientRepository.save(profile);
  }
}