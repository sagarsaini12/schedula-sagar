import {
  BadRequestException,
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
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly doctorRepository: Repository<DoctorProfile>,

    private readonly usersService: UsersService,
  ) {}

  // =========================
  // DAY 3 APIs
  // =========================

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

  // =========================
  // DAY 4 APIs
  // =========================

  async getDoctors(
    query: GetDoctorsQueryDto,
  ) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Page and limit must be greater than 0',
      );
    }

    const queryBuilder =
      this.doctorRepository.createQueryBuilder(
        'doctor',
      );

    if (query.search) {
      queryBuilder.andWhere(
        'LOWER(doctor.fullName) LIKE LOWER(:search)',
        {
          search: `%${query.search}%`,
        },
      );
    }

    if (query.specialization) {
      queryBuilder.andWhere(
        'LOWER(doctor.specialization) LIKE LOWER(:specialization)',
        {
          specialization: `%${query.specialization}%`,
        },
      );
    }

    if (query.availability === 'true') {
      queryBuilder.andWhere(
        'doctor.availabilityStatus = true',
      );
    }

    const total =
      await queryBuilder.getCount();

    const doctors =
      await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

    return {
      data: doctors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  async getDoctorById(id: string) {
    const doctor =
      await this.doctorRepository.findOne({
        where: { id },
      });

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    return doctor;
  }
}