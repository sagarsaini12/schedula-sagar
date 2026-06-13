import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DoctorProfile } from './entities/doctor-profile.entity';

import { UsersService } from '../users/users.service';

import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepository: Repository<DoctorProfile>,

    private readonly usersService: UsersService,
  ) {}

  async createProfile(
    userId: string,
    dto: CreateDoctorProfileDto,
  ) {
    const existingProfile =
      await this.doctorRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (existingProfile) {
      throw new ConflictException(
        'Doctor profile already exists',
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
      this.doctorRepository.create({
        ...dto,
        user,
      });

    return this.doctorRepository.save(profile);
  }

  async getProfile(userId: string) {
    const profile =
      await this.doctorRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (!profile) {
      throw new NotFoundException(
        'Doctor profile not found',
      );
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateDoctorProfileDto,
  ) {
    const profile =
      await this.doctorRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

    if (!profile) {
      throw new NotFoundException(
        'Doctor profile not found',
      );
    }

    Object.assign(profile, dto);

    return this.doctorRepository.save(profile);
  }
}