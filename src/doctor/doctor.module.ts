import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

import { DoctorProfile } from './entities/doctor-profile.entity';

import { UsersModule } from '../users/users.module';

import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    UsersModule,
    AvailabilityModule,
    TypeOrmModule.forFeature([
      DoctorProfile,
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}