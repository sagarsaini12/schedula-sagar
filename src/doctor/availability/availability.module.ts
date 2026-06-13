import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';

import { DoctorProfile } from '../entities/doctor-profile.entity';
import { UsersModule } from '../../users/users.module';

import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';

@Module({
imports: [
  UsersModule,

  TypeOrmModule.forFeature([
    DoctorProfile,
    RecurringAvailability,
    CustomAvailability,
  ]),
],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}